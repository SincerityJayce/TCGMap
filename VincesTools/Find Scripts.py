import os

targetFolder = r"C:/Users/Owner/Desktop/MindMap/public/"

paths = []
result =[""]

def dirConditions(dir):
    if dir.path in ["node_modules"]:
        return False
    else: return True

def dirFunc(dir):
    return

def fileConditions(file):
    if file.path.endswith(".js"):
        return True
    else:
        return False

def fileFunc(path):
    paths.append(path)

    

def unpackDir(path):
    directory = os.scandir(path)
    for f in directory:
        print(f.path)
        if f.is_dir() and dirConditions(f):
            dirFunc(f.path)
            unpackDir(f.path)
        elif f.is_file() and fileConditions(f):
            fileFunc(f.path)




def finalFunc():

    def getFileNumber(path):
        with open(path, "r") as openfile:
            p = openfile.read()
        # // Script Order 0001
        print(path)
        return int(p[16:20])


    paths.sort(key = getFileNumber)

    for path in paths:
        p = path.replace(targetFolder, "")
        result[0] = "{}<script src='{}' defer></script>\n".format(result[0], p)

    print('paste this into your index.html')
    print(result[0])



unpackDir(targetFolder)
finalFunc()