# Imports
from xml.dom import minidom
import mysql.connector
import zipfile
import os
import sys

#Mysql secrets
mydb = mysql.connector.connect(
  host="localhost",
  port="3306",
  user="js",
  password="#!t&OoJ2yk@s",
  database='wifi'
)

hostname = ""

#Inputs
zip = str(sys.argv[1])
# hostname = input("Please specify hostname: ") 

#Functions without logic
def addApo(input): 
    output = "\'" + input + "\'"
    return output

#Functions with logic
def unzip(zip):
   print("path1 " + zip)
   with zipfile.ZipFile(zip, 'r') as zip_ref:
      zip_ref.extractall("./" + extracthostname(zip))

def SendToDb(SSID, Password, hostname):
    mycursor = mydb.cursor()
    sql = "INSERT INTO wifi (SSID, password, hostname) VALUES ({}, {}, {})".format(addApo(SSID), addApo(Password), addApo(hostname))
    # print(sql)
    mycursor.execute(sql)
    mydb.commit()
    # print(mycursor.rowcount, "record inserted.")

def xmlread(path, zip):
    mydoc = minidom.parse(path)
    print(path)

    keyMaterial = mydoc.getElementsByTagName('keyMaterial')
    name = mydoc.getElementsByTagName('name')

    # SSID = name[0].firstChild.data
    # Password = keyMaterial[0].firstChild.data
    # print(SSID, Password)
    # print(keyMaterial.length)

    if (keyMaterial.length > 0):
        SSID = name[0].firstChild.data
        Password = keyMaterial[0].firstChild.data
        print(SSID, Password, extracthostname(zip))
        SendToDb(SSID, Password, extracthostname(zip))

def looptrueall(pathforprofiles):
    print("path2" + pathforprofiles)
    for filename in os.listdir(pathforprofiles):
        if filename.endswith(".xml"): 
            xmlread(pathforprofiles + "/" + filename, pathforprofiles)
            continue
        else:
            continue

def extracthostname(pathprofiles):
    pathoutput = pathprofiles.split("/")
    pathoutput = pathoutput[-1].split(".")
    return pathoutput[0]


#define main function
def main():
    unzip(zip)
    extracthostname(zip)
    print(extracthostname(zip))
    looptrueall(extracthostname(zip))
    quit()
    

# Start main function
main()

