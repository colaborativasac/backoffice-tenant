<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'

const forgotPasswordSchema = toTypedSchema(
  z.object({
    email: z.string({ required_error: 'El correo es obligatorio' }).email('El correo no es válido'),
  }),
)

const form = useForm({
  validationSchema: forgotPasswordSchema,
})

const { isSubmitting } = form

const onSubmit = form.handleSubmit((values) => {
  toast.success(`¡Se ha enviado un enlace de restablecimiento a ${values.email}!`)
})
</script>
<template>
  <div class="max-w-md mx-auto">
    <form @submit="onSubmit" class="block w-full space-y-5">
      <div class="text-center space-y-2">
        <h1 class="text-2xl font-bold tracking-tight">Restablecer contraseña</h1>
        <p class="text-sm text-muted-foreground">
          Ingresa tu correo para recibir un enlace de restablecimiento de contraseña
        </p>
      </div>
      <div className="space-y-5">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Correo electrónico</FormLabel>
            <FormControl>
              <Input
                type="email"
                autocomplete="username"
                placeholder="user@vaope.com"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button
          type="submit"
          class="w-full"
          :disabled="isSubmitting"
          aria-label="Submit"
          aria-busy="isSubmitting"
        >
          <Spinner v-if="isSubmitting" />
          Enviar enlace de restablecimiento
        </Button>
      </div>
      <div class="text-center text-sm">
        <Button variant="link" size="sm" as-child>
          <router-link to="/auth/login">Regresar al inicio de sesión</router-link>
        </Button>
      </div>
    </form>
  </div>
</template>
