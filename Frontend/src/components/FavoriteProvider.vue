<script setup>
import {
  Card,
} from '@/components/ui/card'

import {
  Table,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  Avatar,
  AvatarImage,
} from '@/components/ui/avatar'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import starIcon from '@/assets/icons/star.png'

import { favoriteListStore } from '@/store/userList'
import { storeToRefs } from 'pinia'

const store = favoriteListStore()
const { favoriteProviders } = storeToRefs(store)

function removeFavorite(provider) {
  favoriteProviders.value = favoriteProviders.value.filter((p) => p !== provider)
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <Card class="p-5">
    <Table class="max-w-auto">
      <TableHeader>
        <TableRow class="**:text-black **:font-semibold">
          <TableHead></TableHead>
          <TableHead class="w-50">Name</TableHead>
          <TableHead class="w-50">Hired For</TableHead>
          <TableHead class="w-50">Last Hired</TableHead>
          <TableHead class="w-50">You Rated</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TransitionGroup name="favorite">
        <TableRow
          v-for="provider in favoriteProviders"
          :key="provider.userID"
        >
          <TableCell>
            <Avatar class="scale-[1.3] align-top">
              <AvatarImage :src="provider.avatar" />
            </Avatar>
          </TableCell>

          <TableCell>{{ provider.name }}</TableCell>

          <TableCell>
            <Badge variant="outline" class="scale-[1.1] bg-green-600 text-white">
              {{ provider.hiredFor }}
            </Badge>
          </TableCell>

          <TableCell>{{ formatDate(provider.dateRecentlyHired) }}</TableCell>

          <TableCell>
            <Badge variant="ghost" class="scale-[1.1]">
              <img class="w-4 inline-block align-top" :src="starIcon" />
              {{ provider.userRated }}.0
            </Badge>
          </TableCell>

          <TableCell>
            <Button
              @click="removeFavorite(provider)"
              class="hover:bg-destructive hover:text-white"
              variant="outline"
              size="sm"
            >
              Remove
            </Button>
          </TableCell>
        </TableRow>
      </TransitionGroup>

      <TableFooter />
      <TableCaption>A list of your favorited providers.</TableCaption>
    </Table>
  </Card>
</template>

<style scoped>
.favorite-move,
.favorite-enter-active,
.favorite-leave-active {
  transition: all 0.35s ease;
}

.favorite-enter-from,
.favorite-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

.favorite-leave-active {
  position: relative;
}
</style>
