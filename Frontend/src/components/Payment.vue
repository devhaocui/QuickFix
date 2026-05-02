<!-- NOTE: Payment.vue -->
<script setup>
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import defaultAvatar from "@/assets/avatars/defaultAvatar.png";
import { CalendarIcon, Clock } from "lucide-vue-next";

import { useOrderStore } from "@/store/orderStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";

const serviceFee = 10;

const orderStore = useOrderStore();
const {
  selectedProvider,
  scheduledDate,
  scheduledTime,
  scheduledTimeText,
  address,
  apartment,
  plan,
  description,
} = storeToRefs(orderStore);

const formattedDate = computed(() => {
  if (!scheduledDate.value) return "Not selected";
  return new Date(scheduledDate.value + "T00:00:00").toLocaleDateString(
    "en-US",
    {
      dateStyle: "long",
    },
  );
});

const planLabel = computed(() => {
  const labels = {
    small: "Small (1 hour)",
    medium: "Medium (2–3 hours)",
    large: "Large (4+ hours)",
  };
  return labels[plan.value] || plan.value;
});
</script>

<template>
  <div class="items-start flex justify-center m-10 gap-5">
    <Card class="w-100 border-2 rounded-3xl p-5">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Payment Method</FieldLegend>
            <FieldDescription>
              All transactions are secure and encrypted
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel for="checkout-7j9-card-name-43j">
                  Cardholder Full Name
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder=""
                  required
                />
              </Field>
              <Field>
                <FieldLabel for="checkout-7j9-card-number-uw1">
                  Card Number
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-number-uw1"
                  placeholder="1234 5678 9012 3456"
                  required
                />
                <FieldDescription>
                  Enter your 16-digit card number
                </FieldDescription>
              </Field>
              <div class="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel for="checkout-exp-month-ts6"> Month </FieldLabel>
                  <Select default-value="">
                    <SelectTrigger id="checkout-exp-month-ts6">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01"> 01 </SelectItem>
                      <SelectItem value="02"> 02 </SelectItem>
                      <SelectItem value="03"> 03 </SelectItem>
                      <SelectItem value="04"> 04 </SelectItem>
                      <SelectItem value="05"> 05 </SelectItem>
                      <SelectItem value="06"> 06 </SelectItem>
                      <SelectItem value="07"> 07 </SelectItem>
                      <SelectItem value="08"> 08 </SelectItem>
                      <SelectItem value="09"> 09 </SelectItem>
                      <SelectItem value="10"> 10 </SelectItem>
                      <SelectItem value="11"> 11 </SelectItem>
                      <SelectItem value="12"> 12 </SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel for="checkout-7j9-exp-year-f59">
                    Year
                  </FieldLabel>
                  <Select default-value="">
                    <SelectTrigger id="checkout-7j9-exp-year-f59">
                      <SelectValue placeholder="YYYY" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2026"> 2026 </SelectItem>
                      <SelectItem value="2027"> 2027 </SelectItem>
                      <SelectItem value="2028"> 2028 </SelectItem>
                      <SelectItem value="2029"> 2029 </SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel for="checkout-7j9-cvv"> CVV </FieldLabel>
                  <Input id="checkout-7j9-cvv" placeholder="123" required />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel for="checkout-7j9-optional-comments">
                  Comments
                </FieldLabel>
                <Textarea
                  id="checkout-7j9-optional-comments"
                  placeholder="Additional comments, whether you would want to be called or texted"
                  class="resize-none"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <div>
              <p class="mb-5 text-muted-foreground">
                Note: The provider will make communications with you to confirm
                the exact time and details of the job.
              </p>
              <div class="flex gap-2">
                <Button type="submit"> Submit </Button>
                <Button variant="outline" type="button"> Cancel </Button>
              </div>
            </div>
          </Field>
        </FieldGroup>
      </form>
    </Card>

    <Card
      class="flex flex-col max-w-90 border-2 border-black-800 rounded-3xl p-5"
    >
      <!-- Provider Info -->
      <div class="flex flex-col items-center p-5 gap-4">
        <Avatar class="scale-[1.3]">
          <AvatarImage :src="selectedProvider.avatar" />
          <AvatarFallback><img :src="defaultAvatar" /></AvatarFallback>
        </Avatar>
        <CardTitle>{{ selectedProvider.name }}</CardTitle>
      </div>

      <Separator />

      <!-- Job Details -->
      <div class="flex flex-col gap-3 p-5">
        <CardTitle class="text-base">Job Details</CardTitle>

        <div class="flex justify-between text-sm">
          <p class="text-muted-foreground shrink-0 mr-4">Job Size</p>
          <p class="font-medium text-right">{{ planLabel }}</p>
        </div>

        <div class="flex justify-between gap-1 text-sm">
          <p class="text-muted-foreground mr-4">Location</p>
          <!-- WARN: break-words gives linter warnings but ignore it. wrap-break-word -->
          <!-- does not work here for whatever reason. -->
          <p class="min-w-0 text-balance break-words font-medium text-right">
            {{ address }}{{ apartment ? `, ${apartment}` : "" }}
          </p>
        </div>

        <div class="flex flex-col gap-1 text-sm">
          <p class="text-muted-foreground">Task Description</p>
          <p class="text-sm wrap-break-word">{{ description }}</p>
        </div>
      </div>

      <Separator />

      <!-- Schedule -->
      <div class="flex flex-col gap-3 p-5">
        <CardTitle class="text-base">Schedule</CardTitle>

        <div class="flex items-center gap-2 text-sm">
          <CalendarIcon class="size-4 text-muted-foreground" />
          <p>{{ formattedDate }}</p>
        </div>

        <div class="flex items-center gap-2 text-sm">
          <Clock class="size-4 text-muted-foreground" />
          <p>{{ scheduledTime }} {{ scheduledTimeText }}</p>
        </div>
      </div>

      <Separator />

      <!-- Price Breakdown -->
      <div class="flex flex-col gap-3 p-5">
        <CardTitle class="text-base">Cost Breakdown</CardTitle>

        <div class="flex justify-between text-sm">
          <p>Hourly Rate</p>
          <p class="font-medium">${{ selectedProvider.price.toFixed(2) }}</p>
        </div>
        <div class="flex justify-between text-sm">
          <p>Service Fee <span class="text-muted-foreground"></span></p>

          <p>${{ serviceFee.toFixed(2) }}</p>
        </div>
      </div>
    </Card>
  </div>
</template>
