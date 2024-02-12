import { createLazyFileRoute } from '@tanstack/react-router';

const Index: React.FC = () => {
    return (
        <div>
            <h3>Welcome Home!</h3>
        </div>
    );
}

export const Route = createLazyFileRoute("/")({
    component: Index
});
