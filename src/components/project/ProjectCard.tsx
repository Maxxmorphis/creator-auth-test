import { type Project } from '@prisma/client'
import { Box, Text, Image, Group } from '@mantine/core'
import { Tag } from '@/components/common/Tag'
import { useRouter } from 'next/router'

type Props = {
  project: Project
}

export const ProjectCard = ({ project }: Props) => {
  const router = useRouter()

  return (
    <Box
      px={9}
      pt={9}
      pb={100}
      sx={{
        border: '1px solid #FFFFFF33',
        borderRadius: 14,
        position: 'relative',
      }}
    >
      <Image
        src={project.bannerImage}
        width={'100%'}
        fit={'cover'}
        height={318}
        alt={project.name}
        radius={10}
        mb={20}
        sx={{
          cursor: 'pointer',
        }}
        onClick={() => {
          if (project.status === 'Draft') {
            void router.push(`/dashboard/project/edit/${project.id}`)
          } else {
            void router.push(`/dashboard/project/${project.id}`)
          }
        }}
      />
      <Group
        spacing={0}
        noWrap
      >
        <Image
          src={project.logoUrl}
          width={40}
          height={40}
          alt={project.name}
          radius={14}
        />
        <Text
          fw={700}
          color={'white.1'}
          ml={'sm'}
          lineClamp={1}
          size={28}
        >
          {project.name}
        </Text>
      </Group>
      <Text
        size={18}
        color={'white.1'}
        lineClamp={3}
        mt={14}
      >
        {project.description}
      </Text>
      <Group mt={'md'}>
        {project.categories.map(category => (
          <Tag
            key={category}
            label={category}
          />
        ))}
      </Group>
      <Group
        position={'right'}
        spacing={34}
        sx={{
          position: 'absolute',
          bottom: 25,
          right: 25,
        }}
      >
        {project.website && (
          <a href={project.website}>
            <svg
              width="19"
              height="19"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5042 0.00034304C11.1723 0.00034304 12.811 0.439951 14.2555 1.27503C15.6997 2.10996 16.8987 3.31085 17.7316 4.75674C18.5645 6.20266 19.002 7.84261 19 9.51143C18.9772 14.7764 14.7059 19.0341 9.48732 18.9998C6.96885 18.9975 4.55463 17.9945 2.7752 16.2113C0.996071 14.4281 -0.00223452 12.011 3.75568e-06 9.49115C0.00238827 6.9717 1.00496 4.55629 2.78737 2.77642C4.56968 0.996373 6.98584 -0.0022355 9.50424 3.75784e-06L9.5042 0.00034304ZM11.7205 7.62129H7.2955C7.08513 8.86643 7.08513 10.1381 7.2955 11.3833H11.7188C11.9223 10.1376 11.923 8.86714 11.7207 7.62129H11.7205ZM5.35261 7.62129H5.35274C5.31313 7.61215 5.27325 7.60526 5.23298 7.60035H2.31976C2.26651 7.59558 2.21365 7.61348 2.17431 7.64952C2.13483 7.6857 2.11258 7.73686 2.11271 7.7904C1.84948 8.90817 1.84431 10.0713 2.09761 11.1914C2.09959 11.2584 2.13192 11.3211 2.1853 11.3617C2.23882 11.4022 2.30771 11.4164 2.37288 11.4004H5.13044C5.20065 11.4004 5.27285 11.4004 5.3583 11.3871H5.35843C5.19059 10.1376 5.18873 8.87141 5.35273 7.62142L5.35261 7.62129ZM13.6498 7.62129C13.8211 8.86816 13.8211 10.1325 13.6498 11.3795C13.6913 11.3885 13.7332 11.3949 13.7753 11.3986H16.6867C16.7399 11.4034 16.7927 11.3855 16.8321 11.3493C16.8715 11.3131 16.8939 11.2621 16.8936 11.2086C17.1571 10.0838 17.1571 8.91338 16.8936 7.78859C16.8886 7.72736 16.8572 7.67131 16.8076 7.63486C16.7582 7.59841 16.6953 7.58529 16.6354 7.59868H13.8569C13.7961 7.60053 13.7316 7.61379 13.6498 7.61949V7.62129ZM7.70551 5.67758H11.3139C10.9138 4.34498 10.3027 3.08513 9.50403 1.94616C8.71012 3.08645 8.10301 4.34617 7.70558 5.67758H7.70551ZM7.70551 13.3135C8.10477 14.6479 8.71179 15.9111 9.50397 17.0564C10.2955 15.9113 10.9023 14.6488 11.3024 13.3155H7.69405L7.70551 13.3135ZM16.0502 5.70031C15.3533 4.30196 13.0685 2.43988 12.003 2.38488C12.531 3.39598 12.9487 4.46098 13.2489 5.56155C13.2901 5.63629 13.3654 5.686 13.4501 5.69461C14.0199 5.70601 14.5897 5.69461 15.1593 5.69461H16.0501L16.0502 5.70031ZM6.98384 2.33932C5.29428 2.93931 3.86965 4.11499 2.95968 5.66045C2.97956 5.67423 3.00128 5.6851 3.02433 5.69279H5.60147C5.67698 5.66999 5.73752 5.613 5.76468 5.53878C5.92417 5.06949 6.04764 4.58879 6.2262 4.12903C6.45035 3.5419 6.71238 2.97201 6.98396 2.33932L6.98384 2.33932ZM2.96342 13.3002C3.54259 14.6035 5.94514 16.5738 6.9896 16.6099C6.95357 16.5377 6.91939 16.4731 6.89276 16.4066C6.55853 15.5801 6.22616 14.7365 5.89578 13.8987C5.82358 13.7086 5.82742 13.4446 5.70581 13.3515C5.5842 13.2584 5.30509 13.3002 5.10002 13.3002H2.96348L2.96342 13.3002ZM11.9881 16.6707C13.6974 16.069 15.1399 14.8837 16.0617 13.323C16.0166 13.3142 15.9709 13.3079 15.925 13.304H13.4353C13.3849 13.3003 13.335 13.3169 13.2969 13.3501C13.2589 13.3833 13.2354 13.4302 13.2321 13.4807C12.951 14.2825 12.6623 15.0823 12.368 15.8766C12.2712 16.133 12.1306 16.3763 11.9881 16.6707Z"
                fill="#E6E6E6"
              />
            </svg>
          </a>
        )}
        {project.discord && (
          <a href={project.discord}>
            <svg
              width="19"
              height="15"
              viewBox="0 0 19 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1917 0C12.0033 0.343549 11.8355 0.698345 11.689 1.06246C10.2501 0.830699 8.78444 0.830699 7.34556 1.06246C7.19912 0.698345 7.03128 0.343549 6.84293 0C5.48753 0.235867 4.16989 0.658278 2.92621 1.25563C0.702261 4.52442 -0.30632 8.49287 0.081143 12.4501C1.53046 13.5597 3.1571 14.4061 4.88931 14.9517C5.28375 14.4211 5.63577 13.859 5.94199 13.2711C5.37684 13.0589 4.83364 12.7903 4.3203 12.4694C4.46109 12.374 4.59428 12.2674 4.71861 12.1507C6.21555 12.885 7.85574 13.2664 9.5173 13.2664C11.1788 13.2664 12.819 12.885 14.316 12.1507C14.4488 12.2666 14.5815 12.3728 14.7143 12.4694C14.1982 12.7878 13.6555 13.0593 13.0926 13.2807C13.3861 13.882 13.7287 14.4571 14.1168 15C15.8469 14.4562 17.4707 13.6097 18.9155 12.4984C19.3123 8.54044 18.3029 4.56875 16.0704 1.30393C14.8407 0.694209 13.5361 0.255638 12.1917 0ZM6.36875 10.19C5.89418 10.1553 5.45126 9.93466 5.13297 9.57447C4.81468 9.21429 4.64577 8.74252 4.66171 8.25821C4.64337 7.77326 4.81144 7.30014 5.13021 6.93942C5.44897 6.57869 5.8933 6.35879 6.36875 6.32646C6.8442 6.35879 7.28853 6.57869 7.60729 6.93942C7.92606 7.30014 8.09413 7.77326 8.07579 8.25821C8.09413 8.74316 7.92606 9.21627 7.60729 9.577C7.28853 9.93773 6.8442 10.1576 6.36875 10.19ZM12.6658 10.19C12.1913 10.1553 11.7483 9.93466 11.4301 9.57447C11.1118 9.21429 10.9429 8.74252 10.9588 8.25821C10.9405 7.77326 11.1085 7.30014 11.4273 6.93942C11.7461 6.57869 12.1904 6.35879 12.6658 6.32646C13.1422 6.35638 13.5879 6.57556 13.9072 6.93684C14.2264 7.29812 14.3937 7.77262 14.3729 8.25821C14.3937 8.7438 14.2264 9.21829 13.9072 9.57957C13.5879 9.94085 13.1422 10.16 12.6658 10.19Z"
                fill="#E6E6E6"
              />
            </svg>
          </a>
        )}
        {project.twitter && (
          <a href={project.twitter}>
            <svg
              width="18"
              height="15"
              viewBox="0 0 18 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 1.7971C17.3235 2.09753 16.6081 2.29614 15.876 2.38674C16.6484 1.9144 17.2271 1.17133 17.505 0.295371C16.7792 0.737656 15.9847 1.04927 15.156 1.21668C14.6021 0.601772 13.8645 0.192458 13.0588 0.0529306C12.2532 -0.0865966 11.4251 0.0515551 10.7044 0.445719C9.98373 0.839882 9.41124 1.46776 9.07672 2.23089C8.74219 2.99401 8.66456 3.84921 8.856 4.66236C7.38848 4.58638 5.953 4.19522 4.64279 3.51429C3.33258 2.83336 2.17696 1.87789 1.251 0.709959C0.926224 1.29054 0.755567 1.94803 0.756 2.61706C0.754848 3.23838 0.903795 3.85034 1.18958 4.39847C1.47536 4.9466 1.88912 5.41388 2.394 5.75872C1.80718 5.74237 1.2329 5.58118 0.72 5.28885V5.33492C0.724398 6.20545 1.02239 7.04771 1.56358 7.71923C2.10477 8.39074 2.85593 8.85029 3.69 9.02014C3.36893 9.12017 3.03559 9.1729 2.7 9.17677C2.4677 9.17399 2.23598 9.15242 2.007 9.11228C2.24452 9.86112 2.70416 10.5156 3.32197 10.9845C3.93977 11.4535 4.68502 11.7136 5.454 11.7288C4.15548 12.7747 2.5523 13.3455 0.9 13.3503C0.599162 13.3513 0.298562 13.3328 0 13.295C1.68699 14.41 3.65293 15.0019 5.661 14.9994C7.04672 15.0142 8.42142 14.7461 9.7048 14.2109C10.9882 13.6756 12.1545 12.884 13.1357 11.8822C14.1168 10.8804 14.8932 9.68845 15.4193 8.37606C15.9454 7.06368 16.2108 5.65712 16.2 4.23856C16.2 4.08194 16.2 3.91611 16.2 3.75027C16.9062 3.21113 17.5153 2.5502 18 1.7971Z"
                fill="#E6E6E6"
              />
            </svg>
          </a>
        )}
      </Group>
    </Box>
  )
}
