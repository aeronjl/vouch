import graphene
from graphene_django import DjangoObjectType
from .models import Paper, Comment

class PaperType(DjangoObjectType):
    class Meta:
        model = Paper

class CommentType(DjangoObjectType):
    class Meta:
        model = Comment

class Query(graphene.ObjectType):
    papers = graphene.List(PaperType)
    paper = graphene.Field(PaperType, id=graphene.Int())

    def resolve_papers(self, info):
        return Paper.objects.all()

    def resolve_paper(self, info, id):
        return Paper.objects.get(pk=id)

class AddPaper(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        url = graphene.String(required=True)

    paper = graphene.Field(PaperType)

    def mutate(self, info, title, url):
        paper = Paper(title=title, url=url)
        paper.save()
        return AddPaper(paper=paper)

class VotePaper(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    paper = graphene.Field(PaperType)

    def mutate(self, info, id):
        paper = Paper.objects.get(pk=id)
        paper.votes += 1
        paper.save()
        return VotePaper(paper=paper)

class Mutation(graphene.ObjectType):
    add_paper = AddPaper.Field()
    vote_paper = VotePaper.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)