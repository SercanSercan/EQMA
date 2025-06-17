import './SubscriptionForm.scss';
import { ChangeEvent, useState } from "react";
import { Button, ErrorMessage, Loader, SuccessMessage, TextInput } from "@fremtind/jokul";
import { isValidEmail } from "../../utilities/helpers.ts";
import { subscribeToMajorEQ } from "../../utilities/api.ts";

const SubscriptionForm: React.FC = () => {
    const [userEmail, setUserEmail] = useState<string>('');
    const [invalidEmail, setInvalidEmail] = useState<string>('');
    const [subscriptionResult, setSubscriptionResult] = useState<string>('');
    const [subscriptionError, setSubscriptionError] = useState<string>('');
    const [loader, setLoader] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserEmail(e.target.value.trim());
    };

    const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
        setSubscriptionResult('');
        setSubscriptionError('');
        setInvalidEmail('');
        e.preventDefault();
        if (isValidEmail(userEmail)) {
            setLoader(true);
            try {
                const response = await subscribeToMajorEQ(userEmail);
                if (response.alreadySubscribed) {
                    setSubscriptionResult('You have already subscribed. Please click confirmation link.')
                } else {
                    setSubscriptionResult('Confirmation email is sent. Please check your inbox and click confirmation link.')
                }
            } catch (err) {
                setSubscriptionError('Subscription failed. 😥');
            } finally {
                setLoader(false);
            }
        } else {
            setInvalidEmail('Please type a valid email address');
        }
    }

    return (
        <form className="subscriptionForm">
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
                    onClick={async (e) => await handleSubmit(e)}
                    className="subscriptionForm__emailInput__submitBtn"
                >
                    Subscribe
                </Button>
            </div>
            <div className={"subscriptionForm__result"}>
                {loader && (
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