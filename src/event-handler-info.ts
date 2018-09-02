/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

 export interface EventHandlerInfo {
   id ?: string
   event: string
   handler: (event: any) => void
   keepDefault ?: boolean
 }