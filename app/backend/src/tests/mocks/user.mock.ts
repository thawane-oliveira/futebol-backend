const credentials = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

const userMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',             
} 

const withoutEmail = {
  password: 'prosciutto',
};

const withoutPassword = {
  email: 'risotto@metallica.com',
};

const incorrectEmail = {
  email: 'ghiaccho.com',
  password: 'admin123',
};

const incorrectPassword = {
  email: 'admin@admin.com',
  password: 'mew'
};

const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjgwMDUzMjEwLCJleHAiOjE2ODAzMTI0MTB9.BTtH-qhQ3_O8Yu7DC5PibsTrK3ZX82u8kL7wL_Mp0t0';

export {credentials, userMock, withoutEmail, withoutPassword, incorrectEmail, incorrectPassword, tokenMock};