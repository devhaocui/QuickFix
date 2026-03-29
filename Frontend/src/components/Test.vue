<!-- NOTE: This section is for selecting dates -->

<!-- <script setup> -->
<!-- import { getLocalTimeZone, today, CalendarDate } from '@internationalized/date' -->
<!-- import { Calendar } from '@/components/ui/calendar' -->
<!-- import { ref } from 'vue' -->
<!-- import { Input } from '@/components/ui/input' -->
<!-- import { Button } from '@/components/ui/button' -->
<!---->
<!-- const selectedDate = ref(today(getLocalTimeZone())) -->
<!-- const todayDate = today(getLocalTimeZone()) -->
<!-- const user = [ -->
<!--   { -->
<!--     name: 'John Doe', -->
<!--     availability: [] -->
<!--   } -->
<!---->
<!-- ] -->
<!-- function isDateDisabled(date) { -->
<!--   const diffDays = date.compare(todayDate) -->
<!--   return diffDays < 0 || diffDays >= 14 -->
<!-- } -->
<!---->
<!-- function handleSubmit() { -->
<!--   const year = selectedDate.value.year -->
<!--   const month = selectedDate.value.month -->
<!--   const day = selectedDate.value.day -->
<!--   console.log(year + "\n" + month + "\n" + day) -->
<!-- } -->
<!---->
<!-- //NOTE: need current Worker's time availability. Grab user's current available -->
<!---->
<!-- //PERF: backend might need to do some logic on grabbing current user's data -->
<!-- //such as from their set days and hours of availability, remove any dates -->
<!-- //or time that's unavailable/scheduled by another client. Then only -->
<!-- //outputs the available dates and hours. -->
<!---->
<!-- //WARN: the previous and next buttons are disabled to swap months. If for whatever -->
<!-- //reason we need to re-use Calendar component and need it set it back up in there. -->
<!-- </script> -->
<!---->
<!-- <template> -->
<!--   <Calendar :isDateDisabled="isDateDisabled" v-model="selectedDate" weekday-format="short" -->
<!--     class="rounded-md border shadow-sm **:data-[slot=calendar-cell-trigger]:size-12!"> -->
<!--   </Calendar> -->
<!---->
<!--   <p>{{ selectedDate }}</p> -->
<!--   <Button @click="handleSubmit">Submit</Button> -->
<!-- </template> -->

<!-- <script setup> -->
<!-- import { ref } from 'vue' -->
<!-- import { Button } from '@/components/ui/button' -->
<!---->
<!-- const isAnimating = ref(false) -->
<!-- </script> -->
<!---->
<!-- <template> -->
<!--   <!-- <Button :class="['animate__animated', isAnimating && 'animate__backInUp']" --> -->
<!--   <div v-for="i in 10"> -->
<!--     <Button class="animate__animated animate__backInUp">{{i - 1}}</Button> -->
<!---->
<!--   </div> -->
<!-- </template> -->

<script setup>
import { Button } from '@/components/ui/button'

const items = ['First', 'Second', 'Third', 'Fourth']
</script>

<template>
  <div>
    <Button
      v-for="(item, i) in items"
      :key="i"
      class="animate__animated animate__fadeInUp"
      :style="{ animationDelay: `${i * 0.2}s` }"
    >
      {{ item }}
    </Button>
  </div>
</template>
