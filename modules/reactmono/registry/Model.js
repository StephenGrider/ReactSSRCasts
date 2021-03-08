class Model {
    constructor () {
        this.config = {};
    }

    set (key, data) {
        this.config[key] = data;
    }

    get (key) {
        return this.config[key];
    }
}

export default Model;
