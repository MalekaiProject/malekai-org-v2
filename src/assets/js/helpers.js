export function getJsonInDirectory(requireContext) {
    const json = {};
    requireContext.keys().forEach((filepath) => {
        const jsonContent = requireContext(filepath);

        function createNestedObject(base, names, value) {
            // If a value is given, remove the last name and keep it for later:
            const lastName = arguments.length === 3 ? names.pop() : false;

            // Walk the hierarchy, creating new objects where needed.
            // If the lastName was removed, then the last object is not set yet:
            for (let i = 0; i < names.length; i++) {
                base = base[names[i]] = base[names[i]] || {};
            }

            // If a value was given, set it to the last name:
            if (lastName) base = base[lastName] = value;

            // Return the last object in the hierarchy:
            return base;
        }

        // File path example: ./disciplines/major/adjudicator.json
        const pathParts = filepath.split('/');
        const objectStructure = pathParts.slice(1, pathParts.length - 1);
        const objectName = pathParts.pop().split('.').shift(); // Remove .json suffix off filename
        objectStructure.push(objectName); // Add file name (minus .json) to object struct

        // console.log("Struct: " + objectStructure);
        // console.log("Value: " + obj);

        createNestedObject(json, objectStructure, jsonContent)
    })

    return json;
}
