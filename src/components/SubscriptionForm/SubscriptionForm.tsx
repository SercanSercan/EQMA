import './SubscriptionForm.scss';
import { ChangeEvent, useState } from "react";
import { Button, TextInput } from "@fremtind/jokul";
import { isValidEmail } from "../../utilities/helpers.ts";
import { subscribeToMajorEQ } from "../../utilities/api.ts";

const SubscriptionForm: React.FC = () => {
    const [userEmail, setUserEmail] = useState<string>('');
    const [invalidEmail, setInvalidEmail] = useState<string>('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserEmail(e.target.value.trim());
    };

    const handleSubmit = async (e: SubmitEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isValidEmail(userEmail)) {
            const response = await subscribeToMajorEQ();
            if (response.alreadySubscribed) {
                console.log('Already done')
            } else {
                console.log('First time subscription')
            }
        } else {
            setInvalidEmail('Please type a valid email address');
        }
    }

    return (
        <form className="subscriptionForm">
            <h2>Major Earthquake Notification</h2>
            <TextInput
                label={''}
                errorLabel={invalidEmail}
                onChange={handleChange}
                value={userEmail}
                maxLength={25}
                placeholder={'Email address'}
                autoComplete={'off'}
                className={'subscriptionForm__emailInput'}
            />
            <Button
                variant={"primary"}
                onClick={handleSubmit}
            >
                Subscribe
            </Button>
        </form>
    );
}

export default SubscriptionForm;