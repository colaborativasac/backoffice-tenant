<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Eye, EyeOff } from 'lucide-vue-next'
import { ref } from 'vue'

const passwordVisible = ref(false)

const loginSchema = toTypedSchema(
  z.object({
    email: z.string({ required_error: 'El correo es obligatorio' }).email('El correo no es válido'),
    password: z
      .string({ required_error: 'La contraseña es obligatoria' })
      .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  }),
)

const form = useForm({
  validationSchema: loginSchema,
})

const { isSubmitting } = form

const onSubmit = form.handleSubmit((values) => {
  toast.success(`¡Bienvenido de nuevo, ${values.email}!`)
})
</script>
<template>
  <div class="block w-full space-y-5">
    <div class="text-center space-y-1 pb-3">
      <h1 class="text-2xl font-semibold tracking-tight">Iniciar sesión</h1>
      <p class="text-sm text-muted-foreground">
        Bienvenido! Ingresa tus credenciales para iniciar sesión
      </p>
    </div>
    <form @submit="onSubmit" class="block w-full space-y-5">
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
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>
            Contraseña
            <Button variant="link" size="sm" class="ml-auto" as-child>
              <router-link to="/auth/forgot-password">¿Olvidaste tu contraseña?</router-link>
            </Button>
          </FormLabel>
          <FormControl>
            <InputGroup>
              <InputGroupInput
                :type="passwordVisible ? 'text' : 'password'"
                autocomplete="current-password"
                placeholder="Ingresa tu contraseña"
                v-bind="componentField"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  type="button"
                  variant="ghost"
                  aria-label="Info"
                  size="icon-xs"
                  @click="passwordVisible = !passwordVisible"
                >
                  <Eye v-if="!passwordVisible" />
                  <EyeOff v-else />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
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
        Iniciar sesión
      </Button>
    </form>
  </div>
</template>
