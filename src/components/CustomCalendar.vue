<script setup lang="ts">
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading
} from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { cn } from '@/utils';
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';
import { useVModel } from '@vueuse/core';
import {
  CalendarRoot,
  type CalendarRootEmits,
  type CalendarRootProps,
  useDateFormatter
} from 'radix-vue';
import { createDecade, createYear, toDate } from 'radix-vue/date';
import { computed, type HTMLAttributes, type Ref } from 'vue';

const props = withDefaults(defineProps<CalendarRootProps & { class?: HTMLAttributes['class'] }>(), {
  modelValue: undefined,
  placeholder() {
    return today(getLocalTimeZone());
  },
  weekdayFormat: 'short'
});
const emits = defineEmits<CalendarRootEmits>();

const formatter = useDateFormatter('ko');

const placeholder = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: today(getLocalTimeZone())
}) as Ref<DateValue>;
</script>

<template>
  <CalendarRoot
    v-slot="{ date, grid, weekDays }"
    v-model:placeholder="placeholder"
    v-bind="$attrs"
    :class="cn('rounded-md border p-3', props.class)"
  >
    <CalendarHeader>
      <CalendarHeading class="flex w-full items-center justify-between gap-2">
        <div class="flex w-full gap-2">
          <!-- 년도 선택 (왼쪽) -->
          <Select
            :default-value="placeholder.year.toString()"
            class="flex-1"
            @update:model-value="
              (v: number) => {
                if (!v || !placeholder) return;
                if (Number(v) === placeholder?.year) return;
                placeholder = placeholder.set({
                  year: Number(v)
                });
              }
            "
          >
            <SelectTrigger aria-label="연도 선택">
              <SelectValue placeholder="연도 선택" />
            </SelectTrigger>
            <SelectContent class="max-h-[200px]">
              <SelectItem
                v-for="yearValue in createDecade({ dateObj: date, startIndex: -50, endIndex: 0 })"
                :key="yearValue.toString()"
                :value="yearValue.year.toString()"
              >
                {{ yearValue.year }}년
              </SelectItem>
            </SelectContent>
          </Select>

          <!-- 월 선택 (오른쪽) -->
          <Select
            :default-value="placeholder.month.toString()"
            class="flex-1"
            @update:model-value="
              (v: number) => {
                if (!v || !placeholder) return;
                if (Number(v) === placeholder?.month) return;
                placeholder = placeholder.set({
                  month: Number(v)
                });
              }
            "
          >
            <SelectTrigger aria-label="월 선택">
              <SelectValue placeholder="월 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="month in createYear({ dateObj: date })"
                :key="month.toString()"
                :value="month.month.toString()"
              >
                {{ month.month }}월
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CalendarHeading>
    </CalendarHeader>

    <div class="flex flex-col space-y-4 pt-4">
      <CalendarGrid v-for="month in grid" :key="month.value.toString()">
        <CalendarGridHead>
          <CalendarGridRow>
            <CalendarHeadCell v-for="day in weekDays" :key="day">
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>
        <CalendarGridBody>
          <CalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            class="mt-2"
          >
            <CalendarCell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate">
              <CalendarCellTrigger :day="weekDate" :month="month.value" />
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>
