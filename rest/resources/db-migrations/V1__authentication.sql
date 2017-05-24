CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(2000) NOT NULL,
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY email_key (email)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

CREATE TABLE access_tokens (
  token VARCHAR(40) NOT NULL,
  user_id VARCHAR(255),
  expires TIMESTAMP NOT NULL,
  PRIMARY KEY (token),
  UNIQUE KEY token_key (token)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;
