<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Spinner } from '@/components/ui/spinner'
import { Eye, EyeOff } from 'lucide-vue-next'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { ref } from 'vue'

const passwordVisible = ref(false)
const confirmPasswordVisible = ref(false)

const forgotPasswordSchema = toTypedSchema(
  z
    .object({
      password: z
        .string({ required_error: 'La contraseña es obligatoria' })
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
      confirmPassword: z
        .string({ required_error: 'La confirmación de la contraseña es obligatoria' })
        .min(6, 'La confirmación de la contraseña debe tener al menos 6 caracteres'),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Las contraseñas no coinciden',
          path: ['confirmPassword'],
        })
      }
    }),
)

const form = useForm({
  validationSchema: forgotPasswordSchema,
})

const { isSubmitting } = form

const onSubmit = form.handleSubmit((values) => {
  console.log(values)
  toast.success(`¡La contraseña se ha cambiado correctamente! ${values}`)
})
</script>

<template>
  <div class="max-w-md mx-auto space-y-5">
    <form @submit="onSubmit" class="block w-full space-y-5">
      <div class="text-center space-y-2">
        <h1 class="text-2xl font-bold tracking-tight">Cambiar contraseña</h1>
        <p class="text-sm text-muted-foreground">Crea una contraseña segura para tu cuenta</p>
      </div>
      <div className="space-y-5">
        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Contraseña</FormLabel>
            <FormControl>
              <InputGroup>
                <InputGroupInput
                  :type="passwordVisible ? 'text' : 'password'"
                  autocomplete="new-password"
                  placeholder="Nueva contraseña"
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
        <FormField v-slot="{ componentField }" name="confirmPassword">
          <FormItem>
            <FormLabel>Confirmar contraseña</FormLabel>
            <FormControl>
              <InputGroup>
                <InputGroupInput
                  :type="confirmPasswordVisible ? 'text' : 'password'"
                  autocomplete="new-password"
                  placeholder="Confirmar nueva contraseña"
                  v-bind="componentField"
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    type="button"
                    variant="ghost"
                    aria-label="Info"
                    size="icon-xs"
                    @click="confirmPasswordVisible = !confirmPasswordVisible"
                  >
                    <Eye v-if="!confirmPasswordVisible" />
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
          Cambiar contraseña
        </Button>
      </div>
      <div class="text-center text-sm">
        <span class="text-muted-foreground">¿Recuerdas tu contraseña?</span>
        <router-link to="/auth/login" class="text-primary hover:underline">
          Iniciar sesión
        </router-link>
      </div>
    </form>
  </div>
</template>
