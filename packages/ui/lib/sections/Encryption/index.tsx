import DataObjectIcon from '@mui/icons-material/DataObject'
import HttpsIcon from '@mui/icons-material/Https'
import SaveIcon from '@mui/icons-material/Save'
import { IStep, Stepper } from '../../main'
import { TextField, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import ButtonComponent from '../../components/Button'
import { Chain } from '@vitruvio/types'

interface Props {
  onEncrypt: () => void
  onCommit: () => void
  CID: string
  chain: Chain
}

const EncryptionProcess = (props: Props): JSX.Element => {
  const [activeStep, setActiveStep] = useState(0)
  const [data, setData] = useState('') // data to decrypt
  const Data = () => {
    const [input, setInput] = useState('')
    return (
      <Stack direction={'column'} spacing={2}>
        <TextField
          placeholder='Write your secret string'
          multiline
          variant='filled'
          rows={4}
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
          }}
        />
        <ButtonComponent
          disabled={input === '' || !input}
          onClick={() => {
            setData(input)
            setActiveStep(activeStep + 1)
          }}
          variant='contained'
          color='primary'
          text={'Save'}
        />
      </Stack>
    )
  }

  const Encrypt = () => {
    return (
      <Stack>
        <Typography variant='h3'>
          You are going to be encrypting {data}
        </Typography>
        <ButtonComponent
          onClick={() => {
            props.onEncrypt()
            setActiveStep(activeStep + 1)
          }}
          variant='contained'
          color='primary'
          text={'Encrypt'}
        />
      </Stack>
    )
  }

  const Commit = () => {
    return (
      <Typography>
        You are going to be saving {data} with CID {props.CID} in chain{' '}
        {props.chain}
      </Typography>
    )
  }

  console.log(props)
  const steps: IStep[] = [
    {
      label: 'Generate',
      id: 0,
      children: <Data />,
      icon: <DataObjectIcon />,
    },
    {
      label: 'Encrypt',
      id: 1,
      children: <Encrypt />,
      icon: <HttpsIcon />,
    },
    {
      label: 'Save',
      id: 2,
      children: <Commit />,
      icon: <SaveIcon />,
    },
  ]

  return <Stepper activeStep={activeStep} steps={steps} />
}

export default EncryptionProcess
