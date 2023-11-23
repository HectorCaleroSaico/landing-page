CREATE DEFINER=`root`@`localhost` FUNCTION `main`.`CUID_19D_B10`() RETURNS bigint unsigned
BEGIN
RETURN (((SYSDATE() + 0) * 100000) + MOD(UUID_SHORT(), 100000));
END;

-- 

CREATE DEFINER=`root`@`localhost` PROCEDURE `main`.`sp_get_cities`()
BEGIN

	SELECT 
		tc.city_id city_id,
		tc.city city
	FROM t_cities tc;

END;

--

CREATE DEFINER=`root`@`localhost` PROCEDURE `main`.`sp_get_countries_phonecodes`()
BEGIN

	SELECT 
		tcp.country_phonecode_id country_phonecode_id,
		tcp.country_phonecode country_phonecode,
		tc.iso2 country_iso2
	FROM t_countries_phonecodes tcp
		 INNER JOIN t_countries tc ON tc.country_id = tcp.country_id;
	-- WHERE tcp.country_id = 166;

END;

--

CREATE DEFINER=`root`@`localhost` PROCEDURE `main`.`sp_get_data_emails`(
	p_notification_email_type_id TINYINT UNSIGNED,
	p_data_id BIGINT UNSIGNED
)
BEGIN
	
	IF p_notification_email_type_id = 2 THEN
	
		SELECT 
			tne.notification_email_id,
			tnet.subject,
			tnet.template,
			(
				SELECT 
					tdt.document_type
				FROM t_document_types tdt
				WHERE tdt.document_type_id = tuir.document_type_id
			) AS type_document,
			tuir.document,
			tuir.business_name,
			tuir.first_name,
			tuir.last_name,
			tuir.email,
			(
				SELECT 
					tcp.country_phonecode 
				FROM t_countries_phonecodes tcp
				WHERE tcp.country_phonecode_id = tuir.country_phonecode_id
			) AS country_phonecode,
			tuir.phone,
			(
				SELECT 
					tc.city
				FROM t_cities tc
				WHERE tc.city_id = tuir.city_id
			) AS city,
			tuir.message,
			YEAR(NOW()) year
		FROM t_notifications_emails tne
			 INNER JOIN t_notifications_emails_types tnet ON tnet.notification_email_type_id = tne.notification_email_type_id
			 INNER JOIN t_user_information_requests tuir ON tuir.user_information_request_id = tne.user_id
		WHERE tne.notification_email_status_id = 1
			  AND tne.notification_email_type_id = p_notification_email_type_id
			  AND tne.user_id = p_data_id;
	
	END IF;

END;

--

CREATE DEFINER=`root`@`localhost` PROCEDURE `main`.`sp_get_document_types`()
BEGIN

	SELECT 
		tdt.document_type_id document_type_id,
		tdt.document_type document_type,
		tdt.description description 
	FROM t_document_types tdt;

END;

--

CREATE DEFINER=`root`@`localhost` PROCEDURE `main`.`sp_get_error_logs`()
    COMMENT 'Obtener errores de los procedimientos almacenados'
BEGIN
 
SELECT * FROM main.t_error_logs;

END;

--

CREATE DEFINER=`root`@`localhost` PROCEDURE `main`.`sp_set_error_logs`(
	p_procedure VARCHAR(255),
	p_error_log VARCHAR(1024),
	p_params JSON
)
    COMMENT 'Registrar errores en los procedimientos almacenados'
BEGIN
 
INSERT INTO t_error_logs (
error_log_id,
`procedure`,
error_log,
params
) VALUES (
CUID_19D_B10(),
p_procedure,
p_error_log,
p_params
);

END;

--

CREATE DEFINER=`root`@`localhost` PROCEDURE `main`.`sp_set_upload_documents`(
	p_path_file VARCHAR(255)
)
BEGIN
	
	DECLARE v_message VARCHAR(255);
	DECLARE v_error_code INT;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN
	
	    GET DIAGNOSTICS CONDITION 1  v_message = MESSAGE_TEXT, v_error_code = MYSQL_ERRNO;
	
	    ROLLBACK;
	
	    CALL sp_set_error_logs('sp_set_upload_documents', CONCAT(v_error_code, '-', v_message), JSON_OBJECT(
	    	'p_path_file', p_path_file
		));
	
	END;

	START TRANSACTION;

		DROP TEMPORARY TABLE IF EXISTS tt_documents;
	
		CREATE TEMPORARY TABLE tt_documents(
			document_type VARCHAR(2),
			serie VARCHAR(4),
			number VARCHAR(6),
			amount FLOAT(10, 2)
		);
		
		SET @prepare = CONCAT("
			LOAD DATA LOCAL INFILE '",p_path_file, "' 
			INTO TABLE tt_documents
		");
	
	/*
	 
			FIELDS TERMINATED BY '\t' ENCLOSED BY '' ESCAPED BY '\\'
			LINES TERMINATED BY '\n' STARTING BY ''
	 */
	
		PREPARE stmt FROM @prepare;
		EXECUTE stmt;
		DEALLOCATE PREPARE stmt;
		
		SELECT
			*
		FROM tt_documents;
	
	COMMIT;

END;

--

CREATE DEFINER=`root`@`localhost` PROCEDURE `main`.`sp_set_user_information_requests`(
	p_document_type_id TINYINT UNSIGNED,
	p_document VARCHAR(12),
	p_business_name VARCHAR(150),
	p_first_name VARCHAR(150),
	p_last_name VARCHAR(150),
	p_email VARCHAR(50),
	p_country_phonecode_id TINYINT UNSIGNED,
	p_phone BIGINT UNSIGNED,
	p_city_id TINYINT UNSIGNED,
	p_message TEXT
)
BEGIN
	
	DECLARE v_new_user_information_request_id BIGINT UNSIGNED;
	DECLARE v_first_name, v_last_name, v_email VARCHAR(150);
	DECLARE v_message VARCHAR(255);
	DECLARE v_error_code INT;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN
	
	    GET DIAGNOSTICS CONDITION 1  v_message = MESSAGE_TEXT, v_error_code = MYSQL_ERRNO;
	
	    ROLLBACK;
	
	    CALL sp_set_error_logs('sp_set_user_information_requests', CONCAT(v_error_code, '-', v_message), JSON_OBJECT(
	    	'p_document_type_id', p_document_type_id,
	    	'p_document', p_document,
	    	'p_business_name', p_business_name,
	    	'p_first_name', p_first_name,
	    	'p_last_name', p_last_name,
	    	'p_email', p_email,
	    	'p_country_phonecode_id', p_country_phonecode_id,
	    	'p_phone', p_phone,
	    	'p_city_id', p_city_id,
	    	'p_message', p_message
		));
	
		SELECT 
			'false' success,
			'Hubo un error al registrar la solicitud de información.' message;
	
	END;

	START TRANSACTION;

		SET v_new_user_information_request_id = main.CUID_19D_B10();

		INSERT INTO main.t_user_information_requests (
			user_information_request_id,
			document_type_id,
			document,
			business_name,
			first_name,
			last_name,
			email,
			country_phonecode_id,
			phone,
			city_id,
			message
		) VALUES (
			v_new_user_information_request_id,
			p_document_type_id,
			p_document,
			p_business_name,
			p_first_name,
			p_last_name,
			p_email,
			p_country_phonecode_id,
			p_phone,
			p_city_id,
			p_message
		);
	
		INSERT INTO t_notifications_emails (
			notification_email_id,
			notification_email_status_id,
			notification_email_type_id,
			email,
			user_id,
			`data`
		) VALUES (
			main.CUID_19D_B10(),
			1,
			2,
			p_email,
			v_new_user_information_request_id,
			JSON_OBJECT('id', v_new_user_information_request_id)
		);
		
		/*SELECT 
			*
		FROM t_user_information_requests tuir
		WHERE tuir.*/
	
		SELECT 
			'true' success,
			'La solicitud de información fue registrada' message,
			p_email email,
			2 notification_email_type_id,
			v_new_user_information_request_id user_information_request_id;
	
	COMMIT;

END;