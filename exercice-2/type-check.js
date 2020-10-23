function type_check_v1(arg1, type) {
    const typeOfArg = typeof arg1;

    switch (typeOfArg) {
        case 'object':
            switch (type) {
                case 'null':
                    return arg1 === null;
                case 'array':
                    return Array.isArray(arg1);
                case 'object':
                    return arg1 !== null && !Array.isArray(arg1);
                default:
                    return false;
            }
        default:
            return typeOfArg === type;
    }
}

function type_check_v2(arg1, conf) {
    for(key in conf) {
        switch (key) {
            case 'type':
                if (!type_check_v1(arg1, conf.type)) return false;
                break;
            case 'value':
                if(JSON.stringify(arg1) !== JSON.stringify(conf.value)) return false
                break;
            case 'enum':
                let found = false;
                for(subValue in conf.enum){
                    if(type_check_v2(arg1, {value: subValue})) {
                        found = true;
                        break;
                    }
                }
                if(!found) return false;
        }
    }
    return true;
}

function type_check() {

}