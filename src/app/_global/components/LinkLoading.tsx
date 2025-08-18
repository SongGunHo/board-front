'use client'
import { ImNeutral2, ImSpinner2 } from 'react-icons/im'

import { useLinkStatus } from 'next/link'

export default function LinkLoding (){
    const {pending} = useLinkStatus()
    return pending && <ImNeutral2 className='spinner'/>

    
}