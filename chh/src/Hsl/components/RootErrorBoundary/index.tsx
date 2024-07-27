'use client'
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { Flex, Heading } from "../../components/ui";
import { useRouter } from "next/navigation";

const RootErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const navigate = useRouter()
  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }: FallbackProps) => (
        <Flex $direction="column">
          <Heading tag="h1">{"Something went wrong"}</Heading>
          <button
            onClick={() => {
              resetErrorBoundary();
              navigate.replace("/")
            }}
          >
            Go to Home
          </button>
        </Flex>
      )}
    >
      {children}
    </ErrorBoundary>
  );
};

export default RootErrorBoundary;
