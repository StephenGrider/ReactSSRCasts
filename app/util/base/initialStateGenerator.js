import btoa from 'btoa';
import serialize from 'serialize-javascript';
import { getStateVar } from '~app/util/base/config';

// Generate initial state function.
export default (state) => {
    let stateContent = btoa(serialize(state));
    let contentParts = [];
    const chunkMaxLength = 100;
    const chunkMinLength = 50;

    while (stateContent) {
        let statePartLength = Math.floor(Math.random() * chunkMaxLength) + chunkMinLength;
        contentParts.push(stateContent.substr(0, statePartLength));
        stateContent = stateContent.substr(statePartLength);
    }

    let idx = 0;
    let outputVariables = '';
    let contentSum = '';
    contentParts.map((part) => {
        let variableName = `a${idx}`;
        outputVariables += `var ${variableName}='${part}';`;
        contentSum += contentSum ? `+${variableName}` : `${variableName}`;
        idx++;
    });

    let stateVarName = getStateVar();

    return `
<script>
    var ${stateVarName};
    function getState() {
        ${outputVariables}
        ${stateVarName} = ${contentSum};
    }
    getState();
</script>`;
}
