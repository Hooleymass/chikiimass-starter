import { getPayloadHMR } from "@payloadcms/next/utilities"
import config from "@payload-config"

export async function SampleComponent() {
    const payload = await getPayloadHMR({ config });

    const users = await payload.find({
        collection: 'users'
    })

    return (
        <div className='bg-gray-300 text-black font-serif p-20 border border-white'>
            {users.docs.map((user) =>{
                return(
                    <div className="align-center justify-center">
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