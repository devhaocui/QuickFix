<!-- NOTE: ProviderList.vue -->
<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Label } from "@/components/ui/label";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { ref, computed } from "vue";
import workPhoto1 from "@/assets/workPhotos/bathroom.jpg";
import workPhoto2 from "@/assets/workPhotos/garden.jpg";
import workPhoto3 from "@/assets/workPhotos/kitchen.jpg";
import profAvatar from "@/assets/avatars/avatar.png";
import defaultAvatar from "@/assets/avatars/defaultAvatar.png";
import starIcon from "@/assets/icons/star.png";
import checkMarkIcon from "@/assets/icons/checkMark.png";
import aboutMeIcon from "@/assets/icons/aboutMe.png";
import albumIcon from "@/assets/icons/album.png";
import reviewIcon from "@/assets/icons/review.png";
import spainFlag from "@/assets/flags/ES.svg";
import vietnamFlag from "@/assets/flags/VN.svg";
import arabicFlag from "@/assets/flags/SA.svg";
import chinaFlag from "@/assets/flags/CN.svg";
import usFlag from "@/assets/flags/US.svg";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import { faker } from "@faker-js/faker";
import { Badge } from "@/components/ui/badge";
import Provider from "@/components/Provider.vue";
import Scheduler from "@/components/Scheduler.vue";

import { userListStore } from "@/store/userList";
import { storeToRefs } from "pinia";

const store = userListStore();
const { providers } = storeToRefs(store);

const profileOpen = ref({});
const schedulerOpen = ref(false);
const selectedProvider = ref(null);

function handleSelect(provider, index) {
  // WARN: commented out code will be depreciated and refactored.
  // profileOpen.value[index] = false;
  // selectedProvider.value = provider;
  // setTimeout(() => {
  //   schedulerOpen.value = true;
  // }, 150);
  profileOpen.value[index] = false;
  selectedProvider.value = provider;
  schedulerOpen.value = true;
}
</script>

<template>
  <div>
    <div
      v-for="(provider, index) in providers"
      :key="index"
      class="flex flex-col items-center m-5"
    >
      <Card class="flex flex-col max-w-150 min-w-150">
        <CardHeader class="justify-between flex-row">
          <div class="flex flex-row gap-20 m-2 pl-10">
            <Avatar class="scale-[3] self-center">
              <AvatarImage :src="provider.avatar" alt="@shadcn" />
              <AvatarFallback><img :src="defaultAvatar" /></AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{{ provider.name }}</CardTitle>
              <CardDescription class="mt-1">
                <Badge variant="outline">
                  <img class="w-4 inline-block align-top" :src="starIcon" />
                  {{ provider.averageRating }}
                  ({{ provider.ratings.length }}) reviews
                </Badge>
              </CardDescription>

              <CardDescription class="flex flex-col items-start">
                <Badge variant="outline">
                  <img class="w-4 inline-block" :src="checkMarkIcon" />
                  <span>Completed ({{ provider.jobsCompleted }}) Jobs</span>
                </Badge>
              </CardDescription>
              <Dialog v-model:open="profileOpen[index]">
                <DialogTrigger as-child>
                  <Button
                    variant="default"
                    class="cursor-pointer rounded-3xl mt-3"
                  >
                    View Profile
                  </Button>
                </DialogTrigger>
                <DialogContent
                  class="h-full max-h-95/100 max-w-150 p-0 gap-0 m-0"
                >
                  <DialogHeader class="sr-only">
                    <DialogTitle>Provider Profile</DialogTitle>
                    <DialogDescription>Profile details</DialogDescription>
                  </DialogHeader>
                  <ScrollArea class="h-full max-h-full">
                    <div class="p-4">
                      <Provider
                        :provider="provider"
                        @select="handleSelect(provider, index)"
                      />
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <CardTitle class="w-15 flex flex-col items-center">
            ${{ provider.price }}
            <CardDescription>per hour</CardDescription>
          </CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-2">
          <Separator class="my-2" />
          <CardTitle
            ><img class="w-8 inline-block" :src="aboutMeIcon" /> About
            Me</CardTitle
          >
          <span class="line-clamp-4"> {{ provider.aboutMe }} </span>
        </CardContent>
        <CardFooter class="flex flex-col"> </CardFooter>
      </Card>
    </div>

    <!-- Scheduler dialog — outside the v-for and outside the profile dialog -->
    <Dialog v-model:open="schedulerOpen">
      <DialogContent class="max-w-md p-0 border-0">
        <DialogHeader class="sr-only">
          <DialogTitle>Schedule</DialogTitle>
          <DialogDescription>Select a date and time</DialogDescription>
        </DialogHeader>
        <Scheduler v-if="selectedProvider" :provider="selectedProvider" />
      </DialogContent>
    </Dialog>
  </div>
</template>

<style scoped></style>
