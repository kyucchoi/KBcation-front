<script setup lang="ts">
import HeadBar from '@/components/HeadBar.vue';
import Main from '@/components/Main.vue';
import Input from '@/components/ui/input/Input.vue';
import Button from '@/components/ui/button/Button.vue';
import CustomCalendar from '@/components/CustomCalendar.vue';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/utils/index';
import { DateFormatter, type DateValue, getLocalTimeZone } from '@internationalized/date';
import { Calendar as CalendarIcon } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const df = new DateFormatter('ko-KR', {
  dateStyle: 'long'
});
const userName = ref('');
const gender = ref('');
const value = ref<DateValue>();

const isFormValid = computed(
  () =>
    // 이름이 비어있지 않음
    userName.value.trim() !== '' &&
    // 성별이 선택됨
    gender.value !== '' &&
    // 생년월일이 선택됨
    value.value !== undefined
);

const handleNext = () => {
  if (isFormValid.value) {
    router.push('/signup/bank');
  }
};
</script>

<template>
  <Main :padded="true" :headbar="false">
    <HeadBar :back-button="true">회원가입</HeadBar>
    <div class="signup-title">회원 정보를 <br />입력해주세요</div>

    <div class="signup-container">
      <div class="input-box">
        이름
        <Input type="text" id="name-input" v-model="userName" placeholder="이름을 입력해주세요" />
      </div>

      <div class="input-box">
        성별
        <Select v-model="gender">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="성별을 선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="male" class="select-item">남자</SelectItem>
              <SelectItem value="female" class="select-item">여자</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div class="input-box">
        생년월일
        <Popover>
          <PopoverTrigger as-child>
            <Button
              variant="whiteBlack"
              :class="
                cn('w-auto justify-start text-left font-normal', !value && 'text-muted-foreground')
              "
            >
              <CalendarIcon class="mr-2 h-4 w-4" />
              {{ value ? df.format(value.toDate(getLocalTimeZone())) : '생년월일을 선택해주세요' }}
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-auto p-0">
            <CustomCalendar v-model="value" initial-focus locale="ko" :weekStartsOn="0" />
          </PopoverContent>
        </Popover>
      </div>
    </div>

    <Button size="lg" class="next-button" :disabled="!isFormValid" @click="handleNext">
      다음
    </Button>
  </Main>
</template>

<style scoped>
.signup-title {
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  margin-top: 80px;
  margin-bottom: 60px;
  margin-left: 20px;
}

.signup-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin-left: 20px;
  margin-right: 20px;
}

.input-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 40px;
}

.select-item {
  padding-left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
}

.next-button {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 40px); /* 좌우 여백 20px씩 /
  max-width: 560px; / 600px - 40px */
  margin-top: 0;
  margin-bottom: 20px;
}
</style>
