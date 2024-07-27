import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@payload-config"
import React from "react";

interface SampleComponentProps {
    user: {
        id: any;
        name: any;
        email: any;
    }
}

const SampleComponent: React.FC<SampleComponentProps> = async() => {
    const payload = await getPayloadHMR({ config });

    const users = await payload.find({
        collection: 'users'
    })

    return (
        <div className='bg-gray-300 text-black font-serif p-20 border border-white'>
            {users.docs.map((user) =>{
                return(
                    <div className="align-center justify-center" key={user.id}>
                        <h1 className="">{user.name}</h1>
                        <div key={user.id}>
                            <div className="italic">{user.email}</div>

                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default SampleComponent