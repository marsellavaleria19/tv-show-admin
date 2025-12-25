declare module 'vue-sonner' {
  import type { Component } from 'vue'

  export const Toaster: Component

  export function toast(
    message: string,
    options?: Record<string, any>
  ): string

  export namespace toast {
    function success(message: string, options?: any): string
    function error(message: string, options?: any): string
    function loading(message: string, options?: any): string
  }
}
