import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";

interface IProjectCardProps {
  title: string;
  description: string;
  repo?: string;
  website?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export const ProjectCard = ({
  title,
  description,
  repo,
  website,
  imageSrc,
  imageAlt,
}: IProjectCardProps) => {
  return (
    <Box w="100%" p={4} borderWidth="1px" borderRadius="lg" borderColor="black">
      <Flex direction={["column", "column", "row", "row"]} alignItems="center">
        <Image
          src={imageSrc ? imageSrc : "/appearances.png"}
          alt={imageAlt}
          aspectRatio={1 / 1}
          objectFit="cover"
          borderRadius="10%"
          w="200px"
          m={3}
        />
        <Box>
          <Heading size="md">{title}</Heading>
          {repo && (
            <Link className="md-link" href={repo}>
              repo
            </Link>
          )}
          <Box>
            {website && (
              <Flex>
                <Text mr={3}>online 🟢</Text>
                <Text color="blue">
                  <Link className="md-link" href={website}>
                    {website}
                  </Link>
                </Text>
              </Flex>
            )}
          </Box>
          <Text mt={4}>{description}</Text>
        </Box>
      </Flex>
    </Box>
  );
};
