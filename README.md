To run this repo, first clone it. Use the following command or you can download the zip file of the project

git clone https://github.com/ChandraKiran34/Educase_schoolapi

Set up an env file which should contain your db_name, db_host, db_password, db_user
Now to initialize this you need to type the following commands : 

npm init -y

npm install

node app.js


Hurray !! now the project is working. 

To see the live implementation of this project : 

For adding a new school, you need to test the below url in postman : 
`https://educase-schoolapi-1.onrender.com/api/addSchool` and the following data as payload
{
  "name": "Elementary school ",
  "address": "Frankfurt colony",
  "latitude": 19.7817,
  "longitude": -49.6501
}

For getting list of nearby schools use the following query which contains latitude and longitude as parameters : 

https://educase-schoolapi-1.onrender.com/api/listSchools?latitude=12.9700&longitude=77.6500

By tweaking the latitude and longitude values we can see the list of schools




