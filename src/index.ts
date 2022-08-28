import booleanCastStyle from './rules/boolean-cast-style'
import emotionFileNaming from './rules/emotion-file-naming'
import emotionStyledVariablesNaming from './rules/emotion-styled-variables-naming'

export = {
    rules: {
        'boolean-cast-style': booleanCastStyle,
        'emotion-file-naming': emotionFileNaming,
        'emotion-styled-variables-naming': emotionStyledVariablesNaming
    }
}
