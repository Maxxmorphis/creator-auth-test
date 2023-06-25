import { type Perk, PerkBlockchain, PerkStatus, PerkType } from '@prisma/client'
import { Button, Group, NumberInput, Select, Stack, Textarea, TextInput } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { FeaturedImage } from '@/components/perk/FeaturedImage'
import { TokenRequirement, useTokenRequirementStore } from '@/components/perk/TokenRequirement'
import { useForm } from '@mantine/form'
import dayjs from 'dayjs'
import { api } from '@/utils/api'
import { notifications } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { createNftAllowListPerkSchema, type TwitterRequirementSchemaType } from '@/schemas'
import { type CreateNftAllowListPerkSchemaType, type TokenRequirementSchemaType } from '@/server/api/routers/perk'
import { modals } from '@mantine/modals'
import { TwitterRequirement, useTwitterRequirementStore } from '@/components/perk/TwitterRequirement'
import { WalletInteractionRequirement } from '@/components/perk/WalletInteractionRequirement'

type Props = {
  perk?: Perk
}

type FormValues = {
  name: string
  description: string
  blockchain: PerkBlockchain
  spot: number
  startDate?: Date
  endDate?: Date
  price?: number
  priceSymbol?: string
  totalSupply?: number
}

export const AllowListPerkForm = ({ perk }: Props) => {
  const isPublished = perk?.status === 'Published'
  const perkBlockchains = Object.values(PerkBlockchain)
  const form = useForm<FormValues>({
    initialValues: {
      name: perk?.name ?? '',
      description: perk?.description ?? '',
      blockchain: perk?.blockchain ?? 'Ethereum',
      spot: perk?.allowList?.spots ?? 0,
      startDate: perk?.startDate,
      endDate: perk?.endDate,
      price: perk?.allowList?.price ?? undefined,
      priceSymbol: perk?.allowList?.priceSymbol ?? undefined,
      totalSupply: perk?.allowList?.totalSupply ?? undefined,
    },
    validate: {
      name: value => {
        if (!value) {
          return 'Name is required'
        }
        if (value.length > 50) {
          return 'Name must not exceed 50 characters'
        }
        return null
      },
      description: value => {
        if (!value) {
          return 'Description is required'
        }
        if (value.length > 500) {
          return 'Description must not exceed 500 characters'
        }
      },
      blockchain: value => (!perkBlockchains.includes(value) ? 'Please select a blockchain' : null),
      spot: value => (value < 0 ? 'Spot must be greater than 0' : null),
      startDate: value => (value && dayjs(value).isValid() ? null : 'Must provide a valid date'),
      endDate: (value, values) => {
        if (value && dayjs(value).isValid()) {
          if (dayjs(value).isBefore(values.startDate)) {
            return 'End date must be after start date'
          }
          return null
        }
        return 'Must provide a valid date'
      },
    },
  })

  const blockchainSelectData = perkBlockchains.map(blockchain => ({
    value: blockchain,
    label: blockchain,
  }))

  const { mutate, isLoading } = api.perk.createAllowListPerk.useMutation({
    onError: error => {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      })
    },
    onSuccess: data => {
      notifications.show({
        title: 'Success',
        message: data.message,
        color: 'green',
      })
      void goBack()
    },
  })

  const { push } = useRouter()
  const goBack = () => {
    if (isPublished) {
      void push(`/dashboard/allowlist/${perk?.id}`)
    } else {
      void push('/dashboard/perks')
    }
  }

  const {
    enableTokenRequirement,
    secondTokenRequirementType,
    firstTokenRequirement,
    secondTokenRequirement,
    resetTokenRequirement,
    setEnableTokenRequirement,
    setSecondTokenRequirementType,
    setTokenRequirement,
  } = useTokenRequirementStore()

  const { twitterRequirement, enableTwitterRequirement, resetTwitterRequirement, setTwitterRequirement, setEnableTwitterRequirement } =
    useTwitterRequirementStore()

  useEffect(() => {
    resetTokenRequirement()
    resetTwitterRequirement()
    if (perk) {
      const { tokenHolderRequirement, twitterRequirement } = perk
      if (tokenHolderRequirement) {
        setEnableTokenRequirement(true)
        if (tokenHolderRequirement.tokenRequirement[0]) {
          setSecondTokenRequirementType(tokenHolderRequirement.mustHoldTokenContracts.length > 0 ? 'AND' : 'OR')
          const secondTokenRequirement = tokenHolderRequirement.tokenRequirement[1]
          if (!secondTokenRequirement) {
            setSecondTokenRequirementType('')
          }

          const currentTokenRequirement = tokenHolderRequirement.tokenRequirement[0]
          setTokenRequirement(
            {
              tokenType: currentTokenRequirement.tokenType,
              tokenSymbol: currentTokenRequirement.tokenSymbol ?? '',
              mustHoldAmount: Number(currentTokenRequirement.mustHoldAmount),
              contractAddress: currentTokenRequirement.contractAddress,
              logoUrl: currentTokenRequirement.logoUrl ?? '',
              tokenName: currentTokenRequirement.tokenName ?? '',
              blockchain: currentTokenRequirement.blockchain,
            },
            'first'
          )
        }
        if (tokenHolderRequirement.tokenRequirement[1]) {
          const currentTokenRequirement = tokenHolderRequirement.tokenRequirement[1]
          setTokenRequirement(
            {
              tokenType: currentTokenRequirement.tokenType,
              tokenSymbol: currentTokenRequirement.tokenSymbol ?? '',
              mustHoldAmount: Number(currentTokenRequirement.mustHoldAmount),
              contractAddress: currentTokenRequirement.contractAddress,
              logoUrl: currentTokenRequirement.logoUrl ?? '',
              tokenName: currentTokenRequirement.tokenName ?? '',
              blockchain: currentTokenRequirement.blockchain,
            },
            'second'
          )
        }
      }

      if (twitterRequirement && twitterRequirement.length > 0) {
        setEnableTwitterRequirement(true)
        setTwitterRequirement(twitterRequirement)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createOrUpdatePerk = (data: Partial<CreateNftAllowListPerkSchemaType>) => {
    const resultToParse = {
      ...data,
      perkType: PerkType.Allowlist,
    }

    if (perk?.id) {
      resultToParse.perkId = perk.id
    }

    if (enableTokenRequirement) {
      const tokenRequirement: TokenRequirementSchemaType[] = [firstTokenRequirement]
      if (secondTokenRequirementType !== '') {
        tokenRequirement.push(secondTokenRequirement)
      }
      const hasEmptyContractAddress = tokenRequirement.some(token => token.contractAddress === '')
      if (hasEmptyContractAddress) {
        return notifications.show({
          title: 'Error',
          message: 'Please fill in all the contract addresses',
          color: 'red',
        })
      }
      const contractAddresses = tokenRequirement.map(token => token.contractAddress)
      const mustHoldTokenContracts = secondTokenRequirementType === 'AND' ? contractAddresses : []
      resultToParse.tokenHolderRequirement = {
        mustHoldTokenContracts,
        tokenRequirement,
      }
    }

    if (enableTwitterRequirement) {
      resultToParse.twitterRequirement = twitterRequirement.filter(requirement => requirement.type !== '') as TwitterRequirementSchemaType[]
    }

    const zodResult = createNftAllowListPerkSchema.parse(resultToParse)

    mutate(zodResult)
  }

  const openModal = () =>
    modals.openConfirmModal({
      title: 'Save your changes?',
      labels: { confirm: 'Save as draft', cancel: 'Discard changes' },
      onCancel: () => void goBack(),
      onConfirm: () => {
        const { hasErrors } = form.validate()
        if (!hasErrors) {
          createOrUpdatePerk({
            ...form.values,
            status: PerkStatus.Draft,
          })
        }
      },
    })

  return (
    <form
      onSubmit={form.onSubmit(values => {
        createOrUpdatePerk({
          ...values,
          status: PerkStatus.Published,
        })
      })}
    >
      <Stack>
        <Select
          label="Blockchain"
          required
          data={blockchainSelectData}
          {...form.getInputProps('blockchain')}
          disabled={isPublished}
        />
        <TextInput
          label="Name of the Perk"
          placeholder="Name of the Perk"
          required
          {...form.getInputProps('name')}
          disabled={isPublished}
        />
        <Textarea
          label="Description"
          placeholder="The description of the perk"
          required
          {...form.getInputProps('description')}
          minRows={6}
        />
        <NumberInput
          label="Number of spots"
          hideControls
          required
          {...form.getInputProps('spot')}
          disabled={isPublished}
        />
        <Group align={'flex-start'}>
          <DateTimePicker
            label="Perk start date"
            placeholder="Pick date and time"
            required
            valueFormat="DD MMMM YYYY HH:mm"
            w={200}
            {...form.getInputProps('startDate')}
          />
          <DateTimePicker
            label="Perk end date"
            placeholder="Pick date and time"
            valueFormat="DD MMMM YYYY HH:mm"
            w={200}
            {...form.getInputProps('endDate')}
            required
          />
        </Group>
        <Group>
          <NumberInput
            label="Mint Price"
            hideControls
            precision={2}
            placeholder={'0'}
            {...form.getInputProps('price')}
            disabled={isPublished}
          />
          <TextInput
            label="Symbol"
            placeholder="ETH"
            {...form.getInputProps('priceSymbol')}
            disabled={isPublished}
          />
          <NumberInput
            label="Total Supply"
            placeholder={'0'}
            hideControls
            {...form.getInputProps('totalSupply')}
            disabled={isPublished}
          />
        </Group>
        <FeaturedImage />
        <TwitterRequirement disabled={isPublished} />
        <TokenRequirement disabled={isPublished} />
        <WalletInteractionRequirement disabled={isPublished} />
        <Group>
          <Button
            onClick={() => {
              if (isPublished) {
                goBack()
              } else {
                openModal()
              }
            }}
            variant={'outline'}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            loading={isLoading}
          >
            Submit
          </Button>
        </Group>
      </Stack>
    </form>
  )
}
