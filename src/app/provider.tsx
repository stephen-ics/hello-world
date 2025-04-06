'use client'

import { Provider } from 'react-redux'
import { Store } from './store/store'

export function Providers({ children }: Readonly<{
    children: React.ReactNode; }>) {
    
    return <Provider store={Store}>{children}</Provider>
}