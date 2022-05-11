/**
 * Component to print a JSON string in a readable way.
 * To do that, this component parses the value to a object to stringify it again using a defined space.
 */
import React from 'react'

interface PrettyJSONProps {
    value: string
}

export const PrettyJSON: React.FC<PrettyJSONProps> = ({value}: PrettyJSONProps) => {
    return (
         <div>
             <pre>
                 {JSON.stringify(JSON.parse(value), null, 2)}
             </pre>
         </div>
    )
}