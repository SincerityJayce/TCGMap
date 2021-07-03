import os

thisDirectory = r"C:\Users\Roy\Desktop\Test\public"
paths = [""]


def unpackDir(path):
    directory = os.scandir(path)
    for f in directory:
        print(f.path)
        if f.is_dir():
            unpackDir(f.path)
        elif f.is_file() and f.path.endswith(".js"):
            listScript(f.path)

def listScript(path):
    p = path.replace(thisDirectory, "")
    paths[0] = "{}<script src='{}' defer></script>\n".format(paths[0], p)




unpackDir(thisDirectory)
print(paths[0])