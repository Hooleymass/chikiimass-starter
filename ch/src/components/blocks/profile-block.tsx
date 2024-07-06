import { Block } from "payload"

 
const ProfileBlock: Block = {
  slug: 'profile',
  fields: [
    {
        name:'username',
        type: 'text',
    },
    {
        name: 'age',
        type: 'number',
    },
  ]
}

export default ProfileBlock
