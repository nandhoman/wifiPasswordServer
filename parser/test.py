def extracthostname(pathprofiles):
    pathoutput = pathprofiles.split("/")
    pathoutput = pathoutput[-1].split(".")
    return pathoutput[0]

print(extracthostname("C:/Users/nand/Downloads/test/DESKTOP-67F7126"))