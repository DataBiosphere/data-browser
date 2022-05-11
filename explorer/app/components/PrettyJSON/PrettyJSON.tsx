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