import './SubscriptionForm.scss';
import { ChangeEvent, useState } from "react";
import { Button, ErrorMessage, SuccessMessage, TextInput } from "@fremtind/jokul";
import { isValidEmail } from "../../utilities/helpers.ts";
import { subscribeToMajorEQ } from "../../utilities/api.ts";

const SubscriptionForm: React.FC = () => {
    const [userEmail, setUserEmail] = useState<string>('');
    const [invalidEmail, setInvalidEmail] = useState<string>('');
    const [subscriptionResult, setSubscriptionResult] = useState<string>('');
    const [subscriptionError, setSubscriptionError] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserEmail(e.target.value.trim());
    };

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        setSubscriptionResult('');
        setSubscriptionError('');
        setInvalidEmail('');
        e.preventDefault();
        if (isValidEmail(userEmail)) {
            try {
                const response = await subscribeToMajorEQ(userEmail);
                if (response.alreadySubscribed) {
                    setSubscriptionResult('You have already subscribed. Please click confirmation link.')
                } else {
                    setSubscriptionResult('Confirmation email is sent. Please check your inbox and click confirmation link.')
                }
            } catch (err) {
                setSubscriptionError('Subscription failed. 😥');
            }
        } else {
            setInvalidEmail('Please type a valid email address');
        }
    }

    return (
        <form className="subscriptionForm">
            <h2>Major Earthquake Notification</h2>
            <div className="subscriptionForm__emailInput">
                <TextInput
                    label={''}
                    errorLabel={invalidEmail}
                    onChange={handleChange}
                    value={userEmail}
                    placeholder={'Email address'}
                    autoComplete={'off'}
                />
                <Button
                    variant={"primary"}
                    onClick={async (e) => await handleSubmit(e)}
                >
                    Subscribe
                </Button>
            </div>
            <div className={"subscriptionForm__result"}>
                {subscriptionResult && (
                    <SuccessMessage>{subscriptionResult}</SuccessMessage>
                )}
                {subscriptionError && (
                    <ErrorMessage>{subscriptionError}</ErrorMessage>
                )}
            </div>
        </form>
    );
}

export default SubscriptionForm;