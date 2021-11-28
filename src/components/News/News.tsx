import React from 'react'
import type { FC } from 'react'

type NewsProps = {
    simplified?: boolean
}

export const News:FC<NewsProps> = ({ simplified }) =>
/* console.log('simplified', simplified) */

    (
        <div>
            News
        </div>
    )
