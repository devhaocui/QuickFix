<script setup>
import { ref, reactive } from "vue";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import starIcon from "@/assets/icons/star.png";
import { favoriteListStore } from "@/store/userList";
import { storeToRefs } from "pinia";

const store = favoriteListStore();
const { favoriteProviders } = storeToRefs(store);
const removing = reactive(new Set());
const removeUser = ref(null);

//NOTE: The general idea is, user clicks Remove button, removeFavorite() gets called,
//fadeOut animation starts playing. we wait a bit with setTimeOut(), then remove the
//elment object (the selected provider) from the favorites list
function removeFavorite(provider) {
  removeUser.value = provider.userID;
  setTimeout(() => {
    favoriteProviders.value = favoriteProviders.value.filter(
      (p) => p !== provider,
    );
    removeUser.value = null;
  });
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
</script>

<template>
  <div class="flex flex-col items-center min-w-200">
    <Card class="p-5">
      <Table>
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

        <TransitionGroup name="favorite" tag="tbody">
          <TableRow
            v-for="(provider, i) in favoriteProviders"
            :key="provider.userID"
            :class="[
              'animate__animated',
              removeUser === provider.userID
                ? 'animate__fadeOutUp animate__fast'
                : 'animate__fadeInUp',
            ]"
            :style="{
              animationDelay: removing.has(provider.userID)
                ? '0s'
                : `${i * 0.05}s`,
            }"
          >
            <TableCell>
              <Avatar class="scale-[1.3] align-top">
                <AvatarImage :src="provider.avatar" />
              </Avatar>
            </TableCell>
            <TableCell>{{ provider.name }}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                class="scale-[1.1] bg-green-600 text-white"
              >
                {{ provider.hiredFor }}
              </Badge>
            </TableCell>
            <TableCell>{{ formatDate(provider.dateRecentlyHired) }}</TableCell>
            <TableCell>
              <Badge variant="outline" class="scale-[1.1]">
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
  </div>
</template>

<style scoped>
.favorite-move {
  transition: transform 0.4s ease;
}
</style>
