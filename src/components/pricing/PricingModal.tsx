import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Icon } from '@iconify/react';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider
} from '@heroui/react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PlanFeature {
  text: string;
  tooltip?: string;
}

const basicFeatures: PlanFeature[] = [
  { text: "20 HD Thumbnail Generations per month" },
  { text: "Access to all basic templates" },
  { text: "Standard support response time" },
  { text: "Basic editing tools" },
  { text: "720p max resolution" }
];

const proFeatures: PlanFeature[] = [
  { text: "100 HD Thumbnail Generations per month" },
  { text: "Access to premium templates", tooltip: "Exclusive designs and layouts" },
  { text: "Priority support (24/7)" },
  { text: "Advanced AI editing tools" },
  { text: "4K max resolution" },
  { text: "Custom branding options" }
];

const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="4xl"
      backdrop="blur"
      classNames={{
        base: "bg-content1",
        backdrop: "bg-black/50",
        header: "border-b border-divider",
        body: "py-6",
        closeButton: "hover:bg-content2 text-text-secondary hover:text-text-primary"
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-text-primary">Upgrade Your Plan</h2>
          <p className="text-text-secondary font-normal">
            Choose the perfect plan for your thumbnail creation needs
          </p>
        </ModalHeader>
        <ModalBody>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Plan */}
            <Card className="relative border border-border-primary bg-content2">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between w-full">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">Basic</h3>
                    <p className="text-text-secondary text-sm mt-1">
                      Perfect for content creators
                    </p>
                  </div>
                  <Icon 
                    icon="solar:stars-minimalistic-linear" 
                    className="w-6 h-6 text-primary" 
                  />
                </div>
              </CardHeader>
              <Divider className="bg-border-primary" />
              <CardBody className="pt-4">
                <div className="mb-6">
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-text-primary">$19</span>
                    <span className="text-text-secondary mb-1">/month</span>
                  </div>
                  <Chip 
                    size="sm" 
                    color="primary" 
                    variant="flat"
                    className="mt-2"
                  >
                    Save 20% with annual billing
                  </Chip>
                </div>

                <div className="space-y-3 mb-6">
                  {basicFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Icon 
                        icon="solar:check-circle-linear" 
                        className="w-5 h-5 text-semantic-success flex-shrink-0 mt-0.5" 
                      />
                      <span className="text-sm text-text-secondary">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  color="primary" 
                  variant="solid"
                  size="lg"
                  className="w-full"
                >
                  Select Basic
                </Button>
              </CardBody>
            </Card>

            {/* Pro Plan */}
            <Card className="relative border-2 border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Chip 
                  color="primary" 
                  variant="solid"
                  startContent={<Icon icon="solar:crown-bold" className="w-4 h-4" />}
                >
                  Most Popular
                </Chip>
              </div>
              
              <CardHeader className="pb-4 pt-6">
                <div className="flex items-start justify-between w-full">
                  <div>
                    <h3 className="text-xl font-bold text-text-primary">Pro</h3>
                    <p className="text-text-secondary text-sm mt-1">
                      For professional creators
                    </p>
                  </div>
                  <Icon 
                    icon="solar:crown-linear" 
                    className="w-6 h-6 text-warning" 
                  />
                </div>
              </CardHeader>
              <Divider className="bg-border-primary" />
              <CardBody className="pt-4">
                <div className="mb-6">
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-text-primary">$49</span>
                    <span className="text-text-secondary mb-1">/month</span>
                  </div>
                  <Chip 
                    size="sm" 
                    color="secondary" 
                    variant="flat"
                    className="mt-2"
                  >
                    Save 25% with annual billing
                  </Chip>
                </div>

                <div className="space-y-3 mb-6">
                  {proFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2 group relative">
                      <Icon 
                        icon="solar:check-circle-linear" 
                        className="w-5 h-5 text-semantic-success flex-shrink-0 mt-0.5" 
                      />
                      <span className="text-sm text-text-secondary">{feature.text}</span>
                      {feature.tooltip && (
                        <div className="absolute left-6 -top-8 w-48 bg-content3 text-xs p-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-text-primary">
                          {feature.tooltip}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <Button 
                  color="primary" 
                  variant="solid"
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-secondary"
                >
                  Select Pro
                </Button>
              </CardBody>
            </Card>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PricingModal;