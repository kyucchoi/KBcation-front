import { cva, type VariantProps } from 'class-variance-authority';

export { default as Button } from './Button.vue';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        // 노란색 배경, 흰색 텍스트
        default: 'bg-[#fbbf24] text-[#fdfdfd] shadow hover:bg-[#f59e0c]',

        // 연한 노란색 배경, 검정색 텍스트
        secondary: 'bg-[#fffbeb] text-[#1c1c1c] shadow-sm hover:bg-[#fbbf24]',

        // 흰색 배경, 진한 노란색 텍스트
        whiteYellow: 'bg-[#fdfdfd] text-[#f59e0c] shadow-sm hover:bg-[#f6f7f6]',

        // 흰색 배경, 검정 텍스트
        whiteBlack: 'bg-[#fdfdfd] text-[#1c1c1c] shadow-sm',

        // 비활성화 스타일 (회색)
        disabled: 'bg-[#cdcdcd] text-[#fdfdfd] cursor-not-allowed hover:bg-[#afafaf]'
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-[16px] text-[16px] px-8', // rounded-md를 rounded-[20px]로 변경
        icon: 'h-9 w-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
