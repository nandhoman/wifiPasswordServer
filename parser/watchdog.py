import os

path_to_watch = "C:/Users/nand/Downloads/test/"
print('Your folder path is"',path_to_watch,'"')

old = []
old = os.listdir(path_to_watch)
print(old)

while True:
    new = os.listdir(path_to_watch)
    if len(new) > len(old):
        newfile = list(set(new) - set(old))
        print(newfile[0])
        old = new
        extension = os.path.splitext(path_to_watch + newfile[0])[1]
        if extension == ".zip":
            commandparse = str('python reader.py ') + path_to_watch + newfile[0]
            print(commandparse)
            os.system(commandparse)
        else:
            continue            
    else:
        continue