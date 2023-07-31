import { useRouter } from 'next/router'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import Head from 'next/head'
import { ActionIcon, Badge, Box, Group, Image, Space, Text } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { type GetServerSideProps } from 'next'
import { type Project, type Prisma } from '@prisma/client'
import { prisma } from '@/server/db'
import { getSession } from 'next-auth/react'
import { ProjectStatusBadge } from '@/components/project/ProjectStatusBadge'
import { ProjectDropdownMenu } from '@/components/project/ProjectDropdownMenu'
import { Carousel } from '@mantine/carousel'
import { RejectMessage } from '@/components/project/RejectMessage'

type Props = {
  project: Project
}

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const id = context.params?.id
  if (!id || typeof id !== 'string') {
    return {
      notFound: true,
    }
  }
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const filter: Prisma.ProjectWhereUniqueInput = {
    id,
  }
  if (session.user.role !== 'Admin') {
    filter['userId'] = session.user.id
  }
  const project = await prisma.project.findUnique({
    where: filter,
  })
  if (!project) {
    return {
      notFound: true,
    }
  }

  return {
    props: { project },
  }
}

const WebsiteLink = ({ url }: { url?: string | null }) => {
  if (!url) return null
  const openLink = () => window.open(url, '_blank')

  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={openLink}
      style={{ cursor: 'pointer' }}
    >
      <path
        d="M28 18.25C26.0716 18.25 24.1866 18.8218 22.5832 19.8932C20.9798 20.9645 19.7301 22.4873 18.9922 24.2688C18.2542 26.0504 18.0611 28.0108 18.4373 29.9021C18.8136 31.7934 19.7422 33.5307 21.1057 34.8943C22.4693 36.2579 24.2066 37.1865 26.0979 37.5627C27.9892 37.9389 29.9496 37.7458 31.7312 37.0078C33.5127 36.2699 35.0355 35.0202 36.1068 33.4168C37.1782 31.8134 37.75 29.9284 37.75 28C37.7473 25.415 36.7192 22.9366 34.8913 21.1087C33.0634 19.2808 30.585 18.2527 28 18.25ZM25.5278 31.75H30.4722C29.9688 33.4694 29.125 35.0191 28 36.2397C26.875 35.0191 26.0313 33.4694 25.5278 31.75ZM25.1875 30.25C24.9388 28.7603 24.9388 27.2397 25.1875 25.75H30.8125C31.0613 27.2397 31.0613 28.7603 30.8125 30.25H25.1875ZM19.75 28C19.7494 27.2392 19.8544 26.4819 20.0622 25.75H23.6678C23.4441 27.2417 23.4441 28.7583 23.6678 30.25H20.0622C19.8544 29.5181 19.7494 28.7608 19.75 28ZM30.4722 24.25H25.5278C26.0313 22.5306 26.875 20.9809 28 19.7603C29.125 20.9809 29.9688 22.5306 30.4722 24.25ZM32.3322 25.75H35.9378C36.3541 27.2211 36.3541 28.7789 35.9378 30.25H32.3322C32.5559 28.7583 32.5559 27.2417 32.3322 25.75ZM35.3472 24.25H32.0256C31.6429 22.7439 31.0001 21.3162 30.1263 20.0312C31.2427 20.3313 32.2839 20.8616 33.1831 21.5882C34.0823 22.3148 34.8194 23.2215 35.3472 24.25ZM25.8738 20.0312C24.9999 21.3162 24.3571 22.7439 23.9744 24.25H20.6528C21.1806 23.2215 21.9177 22.3148 22.8169 21.5882C23.7161 20.8616 24.7573 20.3313 25.8738 20.0312ZM20.6528 31.75H23.9744C24.3571 33.2561 24.9999 34.6838 25.8738 35.9688C24.7573 35.6687 23.7161 35.1384 22.8169 34.4118C21.9177 33.6852 21.1806 32.7785 20.6528 31.75ZM30.1263 35.9688C31.0001 34.6838 31.6429 33.2561 32.0256 31.75H35.3472C34.8194 32.7785 34.0823 33.6852 33.1831 34.4118C32.2839 35.1384 31.2427 35.6687 30.1263 35.9688Z"
        fill="black"
      />
      <rect
        x="0.5"
        y="0.5"
        width="55"
        height="55"
        rx="27.5"
        stroke="#E2E2EA"
      />
    </svg>
  )
}

const TwitterLink = ({ url }: { url?: string | null }) => {
  if (!url) return null
  const openLink = () => window.open(url, '_blank')

  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={openLink}
      style={{ cursor: 'pointer' }}
    >
      <path
        d="M39.1931 22.4635C39.1363 22.3264 39.0402 22.2093 38.9169 22.1269C38.7936 22.0444 38.6486 22.0004 38.5002 22.0004H35.6474C35.2486 21.3218 34.6809 20.758 33.9997 20.3637C33.3184 19.9694 32.5467 19.7581 31.7596 19.7504C31.1732 19.7427 30.5912 19.8524 30.0478 20.0729C29.5045 20.2935 29.0107 20.6205 28.5956 21.0348C28.1683 21.454 27.8292 21.9545 27.5982 22.5067C27.3671 23.0589 27.2488 23.6518 27.2502 24.2504V24.8213C23.4759 23.8257 20.3887 20.7554 20.3559 20.7226C20.2552 20.6211 20.1277 20.5504 19.9883 20.5189C19.8489 20.4875 19.7034 20.4965 19.5689 20.545C19.4344 20.5935 19.3166 20.6793 19.2293 20.7925C19.142 20.9057 19.0889 21.0415 19.0762 21.1838C18.6721 25.6641 19.9734 28.6623 21.1387 30.3882C21.7069 31.2414 22.3981 32.0059 23.1899 32.6569C21.7621 34.3004 19.514 35.1638 19.4896 35.1732C19.3838 35.2128 19.2883 35.2759 19.2102 35.3576C19.1322 35.4393 19.0736 35.5377 19.0389 35.6452C19.0042 35.7528 18.9943 35.8668 19.0098 35.9787C19.0253 36.0906 19.066 36.1976 19.1287 36.2916C19.199 36.3966 19.4802 36.7651 20.1674 37.1091C21.0168 37.5348 22.139 37.7504 23.5002 37.7504C30.1256 37.7504 35.6615 32.6485 36.2268 26.0841L39.0309 23.281C39.1357 23.1761 39.2071 23.0424 39.236 22.8969C39.2648 22.7513 39.2499 22.6005 39.1931 22.4635ZM34.9743 25.2207C34.8457 25.3496 34.7684 25.5209 34.7568 25.7026C34.3752 31.6173 29.4327 36.2504 23.5002 36.2504C22.5102 36.2504 21.8127 36.1191 21.3234 35.9616C22.4024 35.3757 23.9071 34.3679 24.8746 32.9166C24.9314 32.8313 24.9701 32.7352 24.9883 32.6344C25.0065 32.5335 25.0038 32.4299 24.9805 32.3301C24.9571 32.2303 24.9135 32.1364 24.8524 32.0541C24.7913 31.9718 24.714 31.9029 24.6252 31.8516C24.5812 31.8263 20.5087 29.3823 20.5002 22.8516C22.0002 24.0704 24.7424 25.9613 27.8756 26.4882C27.9829 26.5063 28.093 26.5008 28.198 26.4721C28.3031 26.4434 28.4006 26.3921 28.4838 26.3219C28.5671 26.2517 28.634 26.1642 28.68 26.0655C28.726 25.9668 28.75 25.8593 28.7502 25.7504V24.2504C28.7494 23.8503 28.8286 23.4541 28.9832 23.0851C29.1377 22.7161 29.3645 22.3817 29.6502 22.1016C29.9241 21.8272 30.2503 21.6105 30.6094 21.4643C30.9684 21.3181 31.3532 21.2453 31.7409 21.2504C32.9277 21.2654 34.0368 21.9891 34.5009 23.0513C34.5594 23.1849 34.6555 23.2985 34.7776 23.3782C34.8996 23.458 35.0423 23.5004 35.1881 23.5004H36.6881L34.9743 25.2207Z"
        fill="black"
      />
      <rect
        x="0.5"
        y="0.5"
        width="55"
        height="55"
        rx="27.5"
        stroke="#E2E2EA"
      />
    </svg>
  )
}

const DiscordLink = ({ url }: { url?: string | null }) => {
  if (!url) return null
  const openLink = () => window.open(url, '_blank')

  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={openLink}
      style={{ cursor: 'pointer' }}
    >
      <path
        d="M25.7498 29.1247C25.7498 29.3472 25.6839 29.5647 25.5603 29.7498C25.4366 29.9348 25.2609 30.079 25.0554 30.1641C24.8498 30.2492 24.6236 30.2715 24.4054 30.2281C24.1871 30.1847 23.9867 30.0776 23.8294 29.9202C23.672 29.7629 23.5649 29.5624 23.5215 29.3442C23.4781 29.126 23.5003 28.8998 23.5855 28.6942C23.6706 28.4887 23.8148 28.3129 23.9998 28.1893C24.1848 28.0657 24.4023 27.9997 24.6248 27.9997C24.9232 27.9997 25.2094 28.1183 25.4203 28.3292C25.6313 28.5402 25.7498 28.8264 25.7498 29.1247ZM31.3748 27.9997C31.1523 27.9997 30.9348 28.0657 30.7498 28.1893C30.5648 28.3129 30.4206 28.4887 30.3355 28.6942C30.2503 28.8998 30.2281 29.126 30.2715 29.3442C30.3149 29.5624 30.422 29.7629 30.5794 29.9202C30.7367 30.0776 30.9371 30.1847 31.1554 30.2281C31.3736 30.2715 31.5998 30.2492 31.8054 30.1641C32.0109 30.079 32.1866 29.9348 32.3102 29.7498C32.4339 29.5647 32.4998 29.3472 32.4998 29.1247C32.4998 28.8264 32.3813 28.5402 32.1703 28.3292C31.9594 28.1183 31.6732 27.9997 31.3748 27.9997ZM38.3545 34.0841L32.0733 36.8694C31.8844 36.9534 31.6804 36.9978 31.4737 37.0001C31.267 37.0023 31.0621 36.9622 30.8714 36.8823C30.6808 36.8024 30.5085 36.6843 30.3652 36.5354C30.2219 36.3865 30.1105 36.2098 30.038 36.0163L29.2777 33.9538C28.8577 33.9819 28.4317 33.9963 27.9998 33.9969C27.568 33.9975 27.142 33.9832 26.722 33.9538L25.9617 36.0163C25.8891 36.2098 25.7776 36.3863 25.6343 36.5352C25.4909 36.684 25.3187 36.802 25.1281 36.8819C24.9375 36.9618 24.7326 37.0019 24.526 36.9997C24.3193 36.9976 24.1153 36.9532 23.9264 36.8694L17.6452 34.0841C17.321 33.9424 17.0576 33.6901 16.9021 33.3723C16.7465 33.0545 16.7088 32.6918 16.7958 32.3488L19.5623 21.4372C19.6354 21.1535 19.7895 20.8971 20.006 20.6997C20.2225 20.5022 20.4918 20.3721 20.7811 20.3254L24.1617 19.7694C24.5344 19.7095 24.9161 19.7903 25.2325 19.9961C25.5489 20.202 25.7774 20.5182 25.8736 20.8832L26.1792 22.0869C26.7748 22.0288 27.3817 21.9997 27.9998 21.9997C28.618 21.9997 29.2242 22.0288 29.8186 22.0869L30.1242 20.8832C30.2202 20.5181 30.4487 20.2018 30.7652 19.9959C31.0816 19.79 31.4634 19.7093 31.8361 19.7694L35.2186 20.3254C35.5079 20.3721 35.7772 20.5022 35.9937 20.6997C36.2102 20.8971 36.3643 21.1535 36.4373 21.4372L39.2058 32.3479C39.2928 32.6912 39.255 33.0543 39.0991 33.3724C38.9432 33.6904 38.6793 33.9427 38.3545 34.0841ZM37.7498 32.7135L34.9814 21.8122C34.9814 21.8122 34.9814 21.8122 34.9739 21.8122L31.5933 21.2497C31.5909 21.2483 31.5881 21.2476 31.5853 21.2476C31.5825 21.2476 31.5798 21.2483 31.5773 21.2497L31.312 22.2941C31.7808 22.3822 32.2495 22.4872 32.7023 22.6147C32.8809 22.6602 33.0364 22.7699 33.1393 22.9227C33.2421 23.0755 33.2852 23.2609 33.2601 23.4434C33.2351 23.6259 33.1438 23.7928 33.0035 23.9123C32.8633 24.0318 32.684 24.0955 32.4998 24.0913C32.4314 24.0911 32.3633 24.0816 32.2973 24.0632C30.8967 23.6831 29.4512 23.4936 27.9998 23.4997C26.5486 23.4933 25.1031 23.6825 23.7023 24.0622C23.6067 24.0918 23.506 24.1019 23.4064 24.092C23.3067 24.082 23.21 24.0522 23.1221 24.0043C23.0341 23.9564 22.9567 23.8914 22.8943 23.8131C22.8318 23.7347 22.7858 23.6447 22.7587 23.5483C22.7316 23.4518 22.7242 23.351 22.7368 23.2516C22.7493 23.1522 22.7817 23.0564 22.8319 22.9697C22.8821 22.8831 22.9491 22.8073 23.0291 22.747C23.109 22.6867 23.2002 22.643 23.2973 22.6185C23.7492 22.491 24.2142 22.386 24.6867 22.2979L24.4214 21.2497C24.4214 21.2497 24.4214 21.2497 24.4102 21.2497L21.0258 21.8057C21.023 21.8049 21.0201 21.8049 21.0173 21.8057L18.2498 32.7182L24.5311 35.4997C24.5343 35.5015 24.5378 35.5024 24.5414 35.5024C24.545 35.5024 24.5486 35.5015 24.5517 35.4997L25.1873 33.786C24.5505 33.6886 23.92 33.5533 23.2992 33.381C23.1143 33.3219 22.9595 33.1934 22.8674 33.0226C22.7752 32.8517 22.7529 32.6518 22.8051 32.4649C22.8573 32.2779 22.98 32.1185 23.1473 32.0201C23.3146 31.9217 23.5136 31.892 23.7023 31.9372C25.103 32.3174 26.5485 32.5067 27.9998 32.4997C29.4511 32.5067 30.8967 32.3174 32.2973 31.9372C32.4889 31.8835 32.694 31.9081 32.8674 32.0056C33.0409 32.1031 33.1685 32.2655 33.2222 32.4571C33.2759 32.6487 33.2513 32.8537 33.1538 33.0272C33.0563 33.2006 32.8939 33.3282 32.7023 33.3819C32.0809 33.554 31.4498 33.6889 30.8123 33.786L31.4452 35.4997C31.4482 35.5014 31.4516 35.5022 31.455 35.5022C31.4584 35.5022 31.4618 35.5014 31.4648 35.4997L37.7498 32.7135Z"
        fill="black"
      />
      <rect
        x="0.5"
        y="0.5"
        width="55"
        height="55"
        rx="27.5"
        stroke="#E2E2EA"
      />
    </svg>
  )
}

export default function ProjectDetailPage({ project }: Props) {
  const { push, query } = useRouter()
  const goBack = () => {
    if (query?.from === 'admin') return push('/dashboard/admin')
    return push('/dashboard/project')
  }

  const projectName = project?.name

  return (
    <DashboardLayout>
      <Head>
        <title>Kiosk - Project - {projectName}</title>
      </Head>
      <Space h={'md'} />
      {project.status === 'Rejected' && <RejectMessage message={project.rejectedReason} />}
      <Space h={'md'} />
      <Box sx={{ position: 'relative' }}>
        <ActionIcon
          variant="outline"
          radius="xl"
          onClick={() => void goBack()}
          sx={{
            position: 'absolute',
            top: 30,
            left: 30,
            zIndex: 1,
          }}
        >
          <IconArrowLeft size="1rem" />
        </ActionIcon>
        <Image
          src={project.bannerImage}
          height={600}
          fit={'cover'}
          alt={projectName}
        />
      </Box>
      <Box
        sx={{ position: 'relative', top: -100, marginBottom: -100 }}
        px={'xl'}
      >
        <Image
          src={project.logoUrl}
          height={200}
          width={200}
          alt={'logo'}
          radius={'50%'}
        />
      </Box>
      <Group
        px={'xl'}
        mt={'md'}
        position={'apart'}
      >
        <Text
          lineClamp={1}
          display={'block'}
          truncate
          size={'xl'}
          fw={'bold'}
        >
          {project.name}
        </Text>
        <Group>
          <ProjectStatusBadge status={project.status} />
          <ProjectDropdownMenu
            id={project.id}
            onDeleted={() => void goBack()}
          />
        </Group>
      </Group>
      <Carousel
        mx="auto"
        my={'xl'}
        withIndicators={false}
        height={480}
        slideGap="md"
        slideSize="40%"
        align="start"
        dragFree
        withControls={false}
        sx={{
          cursor: 'grab',
        }}
      >
        {project.previewImages.map((image, index) => (
          <Carousel.Slide key={index}>
            <Image
              src={image}
              height={480}
              fit={'cover'}
              alt={projectName}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
      <Box px={'xl'}>
        <Text
          size={'xl'}
          fw={'bold'}
        >
          Categories
        </Text>
        <Group
          position={'apart'}
          mt={'md'}
          align={'center'}
        >
          <Group maw={'60%'}>
            <Badge size={'lg'}>{project.projectStage}</Badge>
            <Badge size={'lg'}>{project.blockchain}</Badge>
            {project.categories.map((category, index) => (
              <Badge
                size={'lg'}
                key={index}
              >
                {category}
              </Badge>
            ))}
          </Group>
          <Group>
            <DiscordLink url={project.discord} />
            <TwitterLink url={project.twitter} />
            <WebsiteLink url={project.website} />
          </Group>
        </Group>
        <Text
          size={'xl'}
          fw={'bold'}
          mt={'xl'}
        >
          About
        </Text>
        <Text
          mt={'md'}
          color={'dimmed'}
          sx={{
            whiteSpace: 'pre-line',
          }}
        >
          {project.description}
        </Text>
      </Box>
    </DashboardLayout>
  )
}
