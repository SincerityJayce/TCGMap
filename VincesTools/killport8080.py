import subprocess
import shutil
import re
import os



###############################################
# my paramaters #

###############################################
# file manipulation #

thisPyFilesPath = os.path.dirname(os.path.realpath(__file__))

def readFile(file):
    with open(file, "r") as openfile:
        return openfile.read()


def commandPrompt(cmd):
    subprocess.call(cmd, shell = True)

def createZipFile(directory):
    return shutil.make_archive('79dcfa1a-fe22-4be2-ba3c-546cfb5cdca8', 'zip', directory)

def changeFileExtension(file, newExtension):
    pre, ext = os.path.splitext(file)
    os.rename(file, pre + newExtension)

def openDirectoryInExplorer(dir):
    commandPrompt('explorer "{}"'.format(dir))

def changeDirectory(dir):
    commandPrompt('cd "{}"}'.format(dir))


def pushNuGet(nupkgFilePath, apiKey, feedLink, logTXT = False):
    pushCMD = r'nuget push "{}" {} -Source {}'.format(nupkgFilePath, apiKey, feedLink)

    if logTXT:
        pushCMD = '{} >"{}"'.format(pushCMD, logTXT)

    commandPrompt(pushCMD)

    if logTXT:
        commandPrompt(logTXT)

###############################################






###############################################
# this code #

def findPID(port):
    find = "netstat -ano | findstr :{}".format(port)
    findAndLog = find +" >portlog.txt"
    commandPrompt(findAndLog)

def killFoundPIDs():

    def readPortlog():
        with open("portlog.txt", "r") as portlog:
            log = portlog.read()
            print(log)
            return log

    def reGexForPIDs():
        return re.findall(r"LISTENING\s+\d+", readPortlog())

    def killPID(pid):
        commandPrompt("taskkill /PID {} /F".format(pid))    

    calledPIDs=[]
    for each in reGexForPIDs():
        pid = re.search("\d+", each).group(0)
        if pid not in calledPIDs:
            killPID(pid)
            calledPIDs.append(pid)

def firebaseEmulatorsStart():
    print(commandPrompt('./VincesTools/firebase emulatorsstart.sh'))
    commandPrompt('emuStart.txt')

###################################
###############################
#########################
####################
###############
##########
######
##


def run():
    findPID("5001")
    killFoundPIDs()
    firebaseEmulatorsStart()

    openDirectoryInExplorer('localhost:5000')

run()