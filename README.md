PO Translator
===================
- - - - 

# DISCLAIMER #
This tool is for Educational purposes only and should not be used to translate large PO files. This tool uses Googles translation service in a way that is not aligned with their terms and conditions. Changing the random timeout to something small will abuse the endpoint and will cause Google to block requests coming from this tool.

# Installing #
Make sure that Node is installed and run the following command in the root of the project

    Npm i

## Running ##

Place the PO file that needs to be translated into the input directory, the command to start translating is as follows:

    node poReader.js en es test result
    
Notice that there are 4 parameters, all parameters must be included or the translation will not start.

They must also be in the following order:

    node poReader.js [1] [2] [3] [4]
    [1] = the language code that is being translated
    [2] = the langulage code that is being translated to
    [3] = the input file name, must be in the input directory
    [4] = the output file name, this will be placed in the output directory
    
Language codes can be found here
https://cloud.google.com/translate/docs/languages


## Notes ##

- If there are existing translations in the PO file, that translation will be skipped
- If there are any "{{" in the string that needs to be translated, it will be skipped
    - this is for Angular purposes
- I have placed some random timeouts between translation calls, its best to leave them as is.