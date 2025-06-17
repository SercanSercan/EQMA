import './SubscriptionForm.scss';
import { ChangeEvent, useState } from "react";
import { Button, ErrorMessage, Loader, SuccessMessage, TextInput } from "@fremtind/jokul";
import { isValidEmail } from "../../utilities/helpers.ts";
import { subscribeToMajorEQ } from "../../utilities/api.ts";
import sanitizeHtml from 'sanitize-html';

const SubscriptionForm: React.FC = () => {
    const [userEmail, setUserEmail] = useState<string>('');
    const [invalidEmail, setInvalidEmail] = useState<string>('');
    const [subscriptionResult, setSubscriptionResult] = useState<string>('');
    const [subscriptionError, setSubscriptionError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserEmail(e.target.value.trim());
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setSubscriptionResult('');
        setSubscriptionError('');
        setInvalidEmail('');
        e.preventDefault();
        if (isValidEmail(userEmail)) {
            setIsLoading(true);
            try {
                const response = await subscribeToMajorEQ(sanitizeHtml(userEmail));
                if (response.alreadySubscribed) {
                    setSubscriptionResult('You have already subscribed.')
                } else {
                    setSubscriptionResult('Confirmation email is sent. Please check your inbox and click confirmation link.')
                }
            } catch (err) {
                setSubscriptionError('Subscription failed. 😥');
            } finally {
                setIsLoading(false);
            }
        } else {
            setInvalidEmail('Please type a valid email address');
        }
    }

    return (
        <form className="subscriptionForm" onSubmit={handleSubmit}>
            <h2>Notification Service</h2>
            <p className="subscriptionForm__info">
                EQMA provides e-mail notifications. Whenever a major earthquake occurs,
                you will receive an instant notification in your mailbox.
            </p>
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
                    disabled={isLoading}
                    className="subscriptionForm__emailInput__submitBtn"
                    type={"submit"}
                >
                    Subscribe
                </Button>
            </div>
            <div className={"subscriptionForm__result"}>
                {isLoading && (
                    <Loader className="subscriptionForm__result__loader" textDescription={"Registering your email address"} />
                )}
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