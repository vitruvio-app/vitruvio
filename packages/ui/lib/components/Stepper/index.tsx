import Stepper from '@mui/material/Stepper'
import {
  Stack,
  Step,
  StepConnector,
  StepIconProps,
  StepLabel,
  stepConnectorClasses,
  styled,
} from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import Check from '@mui/icons-material/Check'
export type IStep = {
  label: string
  icon?: JSX.Element
  id: number
  children: JSX.Element
  onChangeStep?: (step: number) => void
}

interface Props {
  steps: IStep[]
  activeStep: number
  onChangeStep?: (step: number) => void
  color?: string
}

const StepperComponent = ({ steps, activeStep, color }: Props): JSX.Element => {
  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: color || theme.palette.primary.main,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundColor: color || theme.palette.primary.main,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
      borderRadius: 1,
    },
    [`& .${stepConnectorClasses.root}`]: {
      display: 'none',
    },
  }))

  const ColorlibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean }
  }>(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
      backgroundColor: color || theme.palette.primary.main,
      boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
      backgroundColor: color || theme.palette.primary.main,
    }),
  }))

  function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props
    const icons: { [index: string]: React.ReactElement } = {}
    steps.forEach((step) => {
      if (step.icon) {
        Object.assign(icons, { [step.id + 1]: step.icon })
      } else {
        Object.assign(icons, { [step.id + 1]: <FiberManualRecordIcon /> })
      }
    })

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {completed ? <Check /> : icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    )
  }

  return (
    <Stack direction={'column'} spacing={2}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      ></div>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<ColorlibConnector />}
      >
        {steps.map((step) => {
          return (
            <Step key={step.id}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {step.label}
              </StepLabel>
            </Step>
          )
        })}
      </Stepper>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        {steps[activeStep] === undefined ? (
          <div>Wrong active step</div>
        ) : (
          steps[activeStep].children
        )}
      </div>
      <div />
    </Stack>
  )
}

export default StepperComponent
