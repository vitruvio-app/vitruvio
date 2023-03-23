#!/bin/bash
# **************************************************************************************************
# Bash script filename: ts-lib.sh - version 0.0.1
# --------------------------------------------------------------------------------------------------
# Description:
# ---------------------------------------------------------------------------------------------------
# Creates a new npm / Typescript project/scaffold inside the packages folder of a monorepo.
#
# parameters (flags):
# -t :      Installs Typescript locally, as a development dependency in the project (package.json)
# -j :      Installs the Jest testing framework 
#
# Syntax to run the script: 
# ---------------------------------------------------------------------------------------------------
# ./npmts.sh <flag1> <flag2> 
# or
# sh npmts.sh <flag1> <flag2>  
# or
# bash npmts.sh <flag1> <flag2> 
#
# example syntax:
# npmts -t, npmts -j, or npmts -t i -j
# 
# Alternatively, you can also run it as a command:
# - Copy the file to the system folder (which is included in your $PATH): e.g /usr/local/bin
# - Give execution permissions: e.g chmod u+x npmts.sh
# - Additionally, you can remove the .sh extension or use a name alias
#
# ***************************************************************************************************
echo "Write your package name"
read prompted_package_name
echo "Write your package description"
read prompeted_package_description
mkdir packages/$prompted_package_name
cd packages/$prompted_package_name
pauthorname="Alex Fiorenza"      # Author's name
pauthorurl="https://github.com/alexFiorenza"      # Author's url
pauthoremail="alexfiorenza2012@gmail.com"             # Author's mail
pversion="0.0.1"                            # The starting version of the app (0.0.1 This can follow the 'major | minor | patch' pattern )
plicense="MIT"                              # The type of license you assign to your app. e.g. "ISC", "MIT", etc.
pname="@vitruvio/"$prompted_package_name                         # The project's (our app's) name might be different than the default which is the project's folder name
pdescription= $prompeted_package_description         # Some short description of the project/app (The default is an empty string)
pmainfile="index.js"                       # The default is "index.js". Use any other filename you wish e.g. index.js, app.js, main.js, etc.
srcfolder="src"                             # Alternativelly, you can use any name you want
buildfolder="dist"                         # Again, instead of "build" you can use any name you like e.g. "jsbuild", "dist" etc.
tstarget="ES6"                              # The default is ES5. You can use any other available option you want. ES6: 97% compatibility with browsers, arrow functions support, Node 12, and afterward …    
assetsfolder="assets"                       # Add an assets folder - it might be useful. For its name: The same as before

# ******************************************************************************************************
#
# * WARNING! * PLEASE AVOID DOING CHANGES FROM THIS POINT AND AFTER, UNLESS YOU REALLY KNOW WELL WHAT TO DO!
#
# ******************************************************************************************************
jestnpmrcfileag="-j"
tscriptnpmrcfileag="-t"
for arg in "$@"
    do
    case $arg in
        $tscriptnpmrcfileag) tsinstall="true";;
        $jestnpmrcfileag) jestinstall="true";;
    esac    
done
npmrcfile='.npmrc'
readmefile="README.md"
pjfile="package.json"
tsconf="tsconfig.json"
tsupconf="tsup.config.ts"

touch tsup.config.ts
echo "import type { Options } from 'tsup'" >> tsup.config.ts  
echo "const config: Options = {" >> tsup.config.ts  
echo "    entry: ['src/index.ts']," >> tsup.config.ts  
echo "    dts: true," >> tsup.config.ts 
echo "    sourcemap: true," >> tsup.config.ts 
echo "    clean: true," >> tsup.config.ts 
echo "    skipNodeModulesBundle: true," >> tsup.config.ts 
echo "    format:  ['esm']," >> tsup.config.ts 
echo "}" >> tsup.config.ts 

echo "export default config" >> tsup.config.ts 

# =====================================================================================================
# PROJECT BASIC FOLDER/FILE STRUCTURE INITIALIZATION - SCAFFOLDING
# =====================================================================================================
# Assign default values in variables - if the user hasn't.  
# Creates source and build folders and some other folders
# folders and files that might be useful later on (test folder, assts folder, .env file)  
if [ "$srcfolder" == "" ]; then 
    srcfolder ="src"
fi    
if [ "$buildfolder" == "" ]; then 
    buildfolder ="build"
fi    
mkdir "$srcfolder" "$buildfolder" 
if [ "$tstarget" == "" ]; then 
    tstarget="ES5"
fi

# =====================================================================================================
# PROJECT NPM INITIALIZATION - BASIC ADJUSTMENTS
# =====================================================================================================
# Create a README.md file and add the description of the project in it.
# The text in the README.md file is being used as value of the key "description" in the package.json file
touch $readmefile                              #README.md
if [ "$pdescription" != "" ]; then
    echo "$pdescription" >> $readmefile        #README.md
fi

# Create and update the (local) Project's .npmrc file
echo 'init-author-name='$pauthorname > $npmrcfile
echo 'init-author-email='$pauthoremail >> $npmrcfile
echo 'init-author-url='$pauthorurl >> $npmrcfile
echo 'init-version='$pversion >> $npmrcfile
echo 'init-license='$plicense >> $npmrcfile
# Force npm to use 'yes' as the answer for all questions   
yarn init -y
# Change the project name if it is not empty, else leave it as it is (i.e. the folder's name, which is the default)
if [ "$pname" != "" ]; then
    # sed -i '' 's/"name"\: .*/"name": "lalala",/' package.json  #It works OK in cl
    sed -i '' 's/"name"\: .*/"name": ''"'"$pname"'"'',/' $pjfile
fi
# Change the entry point (the project's starting script, e.g. index.js) and create an empty typescript (e.g. index.ts) file in sourse folder
if [ "$pmainfile" != "" ]; then
    sed -i '' 's/"main"\: .*/"main": ''"'"$pmainfile"'"'',/' $pjfile
    fname=$(echo $pmainfile | sed 's|\(.*\)[.].*|\1|')
    echo 'console.log("Hi There!  ");' > $srcfolder/$fname.ts
else
    echo 'console.log("Hi There!  ");' > $srcfolder/index.ts
fi
# Install the ‘ambient’ type definitions from the DefinitelyTyped repository: 
# https://github.com/DefinitelyTyped/DefinitelyTyped 
yarn add @types/node tsup -D 
# =====================================================================================================
# TYPESCRIPT INITIALIZATION
# =====================================================================================================
if [ "$tsinstall" == "true" ]; then
    # Install latest version of Typescript as a Development dependency -locally in projrct's folde 
    yarn add  typescript -D
   
    # Initialize the tsconfig.json file with some essential adjustments 
    ./node_modules/.bin/tsc --init --target $tstarget --rootDir $srcfolder --outDir $buildfolder --sourceMap true --esModuleInterop true --resolveJsonModule true
    # Add the build 'command at the scripts section of the package.json file, so we will be able to run 
    # 'npm run build' to compile -at once- all of our .ts files with tsc compiler
    # After the 'npm run tsc' command, all resulted .js files will be placed inside /js subfolder 
    sed -i '' -e '/"scripts".*/a\'$'\n\    ''"build": "./node_modules/typescript/bin/tsc",' $pjfile #package.json
    
else
    # Initialize the tsconfig.json file with some essential adjustments 
    tsc --init --target $tstarget --rootDir $srcfolder --outDir $buildfolder --sourceMap true --esModuleInterop true --resolveJsonModule true
    
    # Add the build 'command at the scripts section of the package.json file, so we will be able to run 
    # 'npm run build' to compile -at once- all of our .ts files with tsc compiler
    # After the 'npm run tsc' command, all resulted .js files will be placed inside /js subfolder 
    sed -i '' -e '/"scripts".*/a\'$'\n\    ''"build": "tsc",' $pjfile #package.json
fi
# Add a 'build:watch' entry in Scripts section - So, when we run 'npm run build:watch' the tsc compiler constantly 
# will constantly monitor and compile any chanches in source .ts files.
sed -i '' -e '/"build".*/a\'$'\n\    ''"build:watch": "npm run build --- --w",' $pjfile #package.json
# Add a 'clean' entry in Scripts section 
sed -i '' -e '/"build:watch".*/a\'$'\n\    ''"clean": "rm -rf '"$buildfolder"/*.js' '"$buildfolder"/*.map'",' $pjfile
# Add a 'start' entry in Scripts section 
sed -i '' -e '/"clean".*/a\'$'\n\    ''"start": "node '"$buildfolder"/"$pmainfile"'",' $pjfile
# Adjustments for building / transpiling .ts source file 
# ------------------------------------------------------------
# Quicly run the same command twice to remove tthe last 2 lines (with the last 2 closing curly bracket }) 
sed -i '' '$d' $tsconf    #tsconfig.json
sed -i '' '$d' $tsconf    #tsconfig.json
# Add the ending curly bracket with comma
echo "  }," >> $tsconf    #sconfig.json
# Add "include ... for including all files are inside source sub-folder
echo '  "include": ["'$srcfolder/**/*""'"],' >> $tsconf    #tsconfig.json
# Add "exclude ... for all test files - Test files are being used via the test framework, e.g jest -if any
echo '  "exclude": ["node_modules", "'$srcfolder'/*.test.ts", "'$srcfolder'/*.spec.ts", "'$testsfolder'/*.*"]' >> $tsconf    #tsconfig.json
# Finally, add aggain the last ending curly bracket
echo "}" >> $tsconf    #tsconfig.json
# =====================================================================================================
# JEST INITIALIZATION
# =====================================================================================================
# If we have to install and use jest testing framework (using the -j parameter), then:
if [ "$jestinstall" == "true" ]; then
    # Install jest library and its type definitions -for development purposes into the
    # devDependencies section in the package.json file
    npm install -D jest ts-jest @types/jest
    # Run jest default configuration file for Typescript (creates the jest.config.js file)
    # (Alternatively we can use the npx:  npx ts-jest config:init)
    ./node_modules/.bin/ts-jest config:init
    # Adjust our project's package.json file, making 'jest' our default test platform - and call it wit -- coverage
    # sed -i '' 's/"echo \\\"Error\: no test specified\\\" .*/"jest"/' $pjfile #package.json
    sed -i '' 's/"echo \\\"Error\: no test specified\\\" .*/"jest --coverage",/' $pjfile #package.json
    # Also add test:watch entry to continuesly monitor and update tests and coverage
    sed -i '' -e '/"test".*/a\'$'\n\    ''"test:watch": "jest --coverage --watchAll"' $pjfile #package.json
    # Create a a new folder named "test"for all test files (xxxx.test.ts or xxxx.specs.ts for testing with Jest
    mkdir $testsfolder 
fi

# =====================================================================================================
# GIT local repo and master branch INITIALIZATION
# =====================================================================================================
# Create the .gitignore file and update it to exclude some of the project files
echo  "node_modules" > .gitignore
echo  ".DS_STORE" > .gitignore
echo  "dist" > .gitignore
echo  ".idea" > .gitignore
echo  "yarn-error.log" > .gitignore
