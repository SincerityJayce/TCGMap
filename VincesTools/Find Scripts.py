import os

thisDirectory = r"C:/Users/Roy/Desktop/Current - Copy/public/"
paths = [""]

def dirConditions(dir):
    if "node_modules" in dir.path:
        return False
    else: return True

def fileConditions(file):
    if file.path.endswith(".js"):
        return True
    else:
        return False

def unpackDir(path):
    directory = os.scandir(path)
    for f in directory:
        print(f.path)
        if f.is_dir() and dirConditions(f):
            unpackDir(f.path)
        elif f.is_file() and fileConditions(f):
            listScript(f.path)

def listScript(path):
    p = path.replace(thisDirectory, "")
    paths[0] = "{}<script src='{}' defer></script>\n".format(paths[0], p)




unpackDir(thisDirectory)
print(paths[0])